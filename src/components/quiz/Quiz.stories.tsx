import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Quiz } from "./Quiz";
import { jsBasicsQuestions } from "./quizData";

const meta: Meta<typeof Quiz> = {
  title: "Quiz/Quiz",
  component: Quiz,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Quiz>;

export const JavascriptBasicsQuiz: Story = {
  args: {
    title: "Javascript Basics Quiz",
    questions: jsBasicsQuestions,
  },
};

export const Interactive: Story = {
  render: () => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    return (
      <Quiz
        title="Javascript Basics Quiz"
        questions={jsBasicsQuestions}
        answers={answers}
        onAnswerChange={(qId, optId) => setAnswers((prev) => ({ ...prev, [qId]: optId }))}
        onQuizSubmit={(finalAnswers) => console.log("Submitted:", finalAnswers)}
      />
    );
  },
};