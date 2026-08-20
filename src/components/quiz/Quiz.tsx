import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface QuizProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  questions: QuizQuestion[];
  answers?: Record<string, string>;
  onAnswerChange?: (questionId: string, optionId: string) => void;
  onSubmit?: (answers: Record<string, string>) => void;
}

function Quiz({ title, questions, answers = {}, onAnswerChange, onSubmit, className, ...props }: QuizProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const unansweredIds = questions
    .map((q) => q.id)
    .filter((id) => !answers[id]);

  const isComplete = unansweredIds.length === 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (isComplete) {
      onSubmit?.(answers);
    }
  };

  return (
    <Card className={cn("max-w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-center text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((question) => {
          const isUnanswered = submitted && !answers[question.id];
          return (
            <div key={question.id} className="space-y-3">
              <p
                className={cn(
                  "text-sm font-medium",
                  isUnanswered ? "text-destructive" : "text-foreground",
                )}
              >
                {question.prompt}
                {isUnanswered && <span className="ml-2 text-xs">(Answer required)</span>}
              </p>
              <RadioGroup
                value={answers[question.id]}
                onValueChange={(value) => onAnswerChange?.(question.id, value)}
              >
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                    <Label htmlFor={`${question.id}-${option.id}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button onClick={handleSubmit} className="w-full">
          Submit Quiz
        </Button>
        {submitted && !isComplete && (
          <p className="text-sm text-destructive text-center">
            Please answer all questions before submitting ({unansweredIds.length} remaining).
          </p>
        )}
        {submitted && isComplete && (
          <p className="text-sm text-accent-foreground text-center">
            Quiz submitted successfully.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

export { Quiz };