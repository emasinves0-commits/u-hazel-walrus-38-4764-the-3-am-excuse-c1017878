import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Visiting hours are 9-5. It's 3:17 AM, and frankly, I suspect my own tamper-evident seal. No sign.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
