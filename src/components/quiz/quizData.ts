import type { QuizQuestion } from "./Quiz";

export const jsBasicsQuestions: QuizQuestion[] = [
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
  {
    id: "q4",
    prompt: "Which method adds a new element to the end of an array?",
    options: [
      { id: "push", label: "push()" },
      { id: "pop", label: "pop()" },
      { id: "shift", label: "shift()" },
      { id: "unshift", label: "unshift()" },
    ],
  },
  {
    id: "q5",
    prompt: "What does the '===' operator check that '==' does not?",
    options: [
      { id: "value_only", label: "Value only" },
      { id: "type_and_value", label: "Both value and type" },
      { id: "reference", label: "Memory reference" },
      { id: "nothing", label: "Nothing, they are identical" },
    ],
  },
  {
    id: "q6",
    prompt: "Which of these is NOT a JavaScript data type?",
    options: [
      { id: "boolean", label: "Boolean" },
      { id: "float", label: "Float" },
      { id: "undefined", label: "Undefined" },
      { id: "symbol", label: "Symbol" },
    ],
  },
  {
    id: "q7",
    prompt: "How do you write a single-line comment in JavaScript?",
    options: [
      { id: "hash", label: "# comment" },
      { id: "slash_star", label: "/* comment */" },
      { id: "double_slash", label: "// comment" },
      { id: "dash_dash", label: "-- comment" },
    ],
  },
  {
    id: "q8",
    prompt: "Which function is used to convert a string into an integer?",
    options: [
      { id: "parseInt", label: "parseInt()" },
      { id: "toString", label: "toString()" },
      { id: "parseFloat", label: "parseFloat()" },
      { id: "valueOf", label: "valueOf()" },
    ],
  },
  {
    id: "q9",
    prompt: "What will 'typeof null' return in JavaScript?",
    options: [
      { id: "null", label: "null" },
      { id: "undefined", label: "undefined" },
      { id: "object", label: "object" },
      { id: "number", label: "number" },
    ],
  },
  {
    id: "q10",
    prompt: "Which keyword is used to define a function in JavaScript?",
    options: [
      { id: "func", label: "func" },
      { id: "function", label: "function" },
      { id: "def", label: "def" },
      { id: "lambda", label: "lambda" },
    ],
  },
];