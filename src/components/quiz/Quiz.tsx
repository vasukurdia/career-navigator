import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
}

function Quiz({ title, questions, answers = {}, onAnswerChange, className, ...props }: QuizProps) {
  return (
    <Card className={cn("max-w-full bg-blue-50", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-center text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <p className="text-sm font-medium text-foreground">{question.prompt}</p>
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
        ))}
      </CardContent>
    </Card>
  );
}

export { Quiz };