import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { UserProvider, useUser } from "./UserContext";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  },
}));

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const ALLOWED_LOCAL_STORAGE_KEYS = new Set(["user_profile_id", "openai_api_key"]);

function TestConsumer() {
  const { setUserProfile, setOpenAIKey } = useUser();
  return (
    <div>
      <button
        onClick={() =>
          setUserProfile({
            id: "profile-123",
            name: "Test Student",
            created_at: new Date().toISOString(),
          })
        }
      >
        Set Profile
      </button>
      <button onClick={() => setOpenAIKey("sk-test-key")}>Set Key</button>
    </div>
  );
}

describe("UserContext — student privacy (COPPA)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("only ever writes whitelisted keys to localStorage, never raw student PII", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    );

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Set Profile" }));
      await user.click(screen.getByRole("button", { name: "Set Key" }));
    });

    const storedKeys = Object.keys(localStorage);
    storedKeys.forEach((key) => {
      expect(ALLOWED_LOCAL_STORAGE_KEYS.has(key)).toBe(true);
    });
  });

  it("never stores the student's name in localStorage, even though it is held in memory", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    );

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Set Profile" }));
    });

    const storedProfileId = localStorage.getItem("user_profile_id");
    expect(storedProfileId).toBe("profile-123");

    const allStoredValues = Object.values(localStorage).join(" ");
    expect(allStoredValues).not.toMatch(/Test Student/);
    expect(allStoredValues).not.toMatch(EMAIL_PATTERN);
  });
});