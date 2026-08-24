import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quiz, type QuizQuestion } from "./Quiz";

const questions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Which keyword declares a constant?",
    options: [
      { id: "var", label: "var" },
      { id: "let", label: "let" },
      { id: "const", label: "const" },
    ],
  },
  {
    id: "q2",
    prompt: 'What is typeof "Hello"?',
    options: [
      { id: "string", label: "string" },
      { id: "text", label: "text" },
    ],
  },
];

describe("Quiz", () => {
  it("renders the title and all question prompts", () => {
    render(<Quiz title="Javascript Basics Quiz" questions={questions} />);

    expect(screen.getByText("Javascript Basics Quiz")).toBeInTheDocument();
    expect(screen.getByText(/Which keyword declares a constant/)).toBeInTheDocument();
    expect(screen.getByText(/What is typeof "Hello"/)).toBeInTheDocument();
  });

  it("renders every option as a radio button", () => {
    render(<Quiz title="Javascript Basics Quiz" questions={questions} />);

    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("prevents submission when a question is left unanswered and shows a validation message", async () => {
    const user = userEvent.setup();
    const onQuizSubmit = vi.fn();

    render(
      <Quiz
        title="Javascript Basics Quiz"
        questions={questions}
        answers={{ q1: "const" }}
        onQuizSubmit={onQuizSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /submit quiz/i }));

    expect(onQuizSubmit).not.toHaveBeenCalled();
    expect(
      screen.getAllByText(/please answer all questions before submitting/i).length,
    ).toBeGreaterThan(0);
  });

  it("marks the unanswered question's legend as invalid after a failed submit", async () => {
    const user = userEvent.setup();

    render(
      <Quiz title="Javascript Basics Quiz" questions={questions} answers={{ q1: "const" }} />,
    );

    await user.click(screen.getByRole("button", { name: /submit quiz/i }));

    const radioGroups = screen.getAllByRole("radiogroup");
    const secondGroup = radioGroups[1];
    expect(secondGroup).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onQuizSubmit with the full answer set once every question is answered", async () => {
    const user = userEvent.setup();
    const onQuizSubmit = vi.fn();

    render(
      <Quiz
        title="Javascript Basics Quiz"
        questions={questions}
        answers={{ q1: "const", q2: "string" }}
        onQuizSubmit={onQuizSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /submit quiz/i }));

    expect(onQuizSubmit).toHaveBeenCalledTimes(1);
    expect(onQuizSubmit).toHaveBeenCalledWith({ q1: "const", q2: "string" });
    expect(
      screen.getAllByText(/quiz submitted successfully/i).length,
    ).toBeGreaterThan(0);
  });

  it("announces the submit result in an aria-live region for screen readers", async () => {
    const user = userEvent.setup();

    render(
      <Quiz title="Javascript Basics Quiz" questions={questions} answers={{ q1: "const" }} />,
    );

    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent("");

    await user.click(screen.getByRole("button", { name: /submit quiz/i }));

    expect(liveRegion).toHaveTextContent(/1 question remaining/i);
  });

  it("calls onAnswerChange when an option is selected", async () => {
    const user = userEvent.setup();
    const onAnswerChange = vi.fn();

    render(
      <Quiz title="Javascript Basics Quiz" questions={questions} onAnswerChange={onAnswerChange} />,
    );

    await user.click(screen.getByRole("radio", { name: "const" }));

    expect(onAnswerChange).toHaveBeenCalledWith("q1", "const");
  });
});