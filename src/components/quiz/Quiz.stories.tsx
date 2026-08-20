import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Quiz, type QuizQuestion } from "./Quiz";

const jsBasicsQuestions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Which keyword is used to declare a constant variable in JavaScript?",
    options: [
      { id: "var", label: "var" },
      { id: "let", label: "let" },
      { id: "const", label: "const" },
      { id: "function", label: "function" },
    ],
  },
  {
    id: "q2",
    prompt: 'What is the output of typeof "Hello"?',
    options: [
      { id: "text", label: "text" },
      { id: "String", label: "String" },
      { id: "string", label: "string" },
      { id: "char", label: "char" },
    ],
  },
  {
    id: "q3",
    prompt: "Which symbol is used for strict equality in JavaScript?",
    options: [
      { id: "eq1", label: "=" },
      { id: "eq2", label: "==" },
      { id: "eq3", label: "===" },
      { id: "neq", label: "!=" },
    ],
  },
];

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
      />
    );
  },
};