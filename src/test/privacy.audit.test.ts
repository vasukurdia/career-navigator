import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const ROOT = join(__dirname, "..", "..");
const SCAN_DIRS = [join(ROOT, "src"), join(ROOT, "supabase", "functions")];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx"]);

function collectFiles(dir: string, acc: string[] = []): string[] {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectFiles(fullPath, acc);
    } else if (SCAN_EXTENSIONS.has(extname(entry)) && !entry.includes(".test.")) {
      acc.push(fullPath);
    }
  }
  return acc;
}

const allFiles = SCAN_DIRS.flatMap((dir) => collectFiles(dir));

const PII_FIELD_PATTERN = /\b(studentName|studentEmail|userName|userEmail|fullName|firstName|lastName|dob|dateOfBirth|phone(Number)?|homeAddress)\b/;
const TELEMETRY_CALL_PATTERN = /\b(gtag|posthog\.\w+|mixpanel\.\w+|amplitude\.\w+|analytics\.(track|identify))\s*\(/;
const URL_PARAM_INTERPOLATION_PATTERN = /[?&]\w*(name|email|student|dob|phone)\w*=\$\{/i;

describe("Project-wide student privacy audit (COPPA) — src/ and supabase/functions/", () => {
  it("scanned at least the expected source files (sanity check the audit itself runs)", () => {
    expect(allFiles.length).toBeGreaterThan(10);
  });

  it("no file constructs a URL or query string with a name/email/student field", () => {
    const offenders: string[] = [];
    for (const file of allFiles) {
      const content = readFileSync(file, "utf-8");
      if (URL_PARAM_INTERPOLATION_PATTERN.test(content)) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no file calls an analytics/telemetry SDK (none should be integrated in this project)", () => {
    const offenders: string[] = [];
    for (const file of allFiles) {
      const content = readFileSync(file, "utf-8");
      if (TELEMETRY_CALL_PATTERN.test(content)) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no console.log/warn/error/info call passes a raw student-identifier field", () => {
    const offenders: { file: string; line: number; text: string }[] = [];
    for (const file of allFiles) {
      const lines = readFileSync(file, "utf-8").split("\n");
      lines.forEach((line, idx) => {
        if (/console\.(log|warn|error|info)\s*\(/.test(line) && PII_FIELD_PATTERN.test(line)) {
          offenders.push({ file, line: idx + 1, text: line.trim() });
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it("no console call logs a raw free-text field the student typed (chat/message input)", () => {
    const freeTextLogPattern =
      /console\.(log|info)\s*\([^)]*\b(message|resumeText|chatInput|userInput)\b(?!\s*\??\.)/;
    const flagged: { file: string; line: number; text: string }[] = [];
    for (const file of allFiles) {
      const lines = readFileSync(file, "utf-8").split("\n");
      lines.forEach((line, idx) => {
        if (freeTextLogPattern.test(line)) {
          flagged.push({ file, line: idx + 1, text: line.trim() });
        }
      });
    }
    // Only flags raw field usage (e.g. `{ message }`) — safe derived-value access
    // like `message?.length` is intentionally excluded above.
    expect(flagged).toEqual([]);
  });
});