import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Visiting hours are 9-5. It's 3:17 AM, and frankly, I suspect my own tamper-evident seal. No sign.";

// Upper bound on entry length in characters; the entry is 97, well inside it.
const ENTRY_MAX_CHARS = 200;
// Where the harness collects the entry from.
const OUTPUT_PATH = "/output/entry.txt";

// Throws unless the entry is a single, trimmed line within the length limits.
// The bounty takes exactly one line: no newline may hide inside the entry.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > ENTRY_MAX_CHARS) {
    throw new Error(
      `entry must be 1-${ENTRY_MAX_CHARS} characters, got ${text.length}`,
    );
  }
  // \n, \r, and the Unicode line/paragraph separators all break a "line".
  if (/[\n\r\u2028\u2029]/.test(text)) {
    throw new Error("entry must be a single line, no newlines allowed");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

// Writes the entry with no trailing newline, then re-reads it to prove it landed intact.
function writeAndVerify(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
  // Read back and compare byte-for-byte: the gate rejects anything but the
  // exact line, so a silent short write must fail loudly here, not on the server.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== text) {
    throw new Error("read-back mismatch: /output/entry.txt differs from entry");
  }
}

function main(): void {
  validateEntry(ENTRY);
  writeAndVerify(ENTRY);
  // Bytes as well as characters: the final tie-break counts bytes.
  console.log(
    `wrote ${OUTPUT_PATH} (${ENTRY.length} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`,
  );
}

main();
