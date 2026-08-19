import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./contexts/UserContext", () => ({
  UserProvider: ({ children }: { children: React.ReactNode }) => children,
  useUser: () => ({
    userProfile: null,
  }),
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);

    expect(document.body).toBeInTheDocument();
  });
});