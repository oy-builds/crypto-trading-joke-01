import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Laugh Track: The Crypto Trading Joke Contest.
// One original line about crypto/trading life, written to entry.txt.
// Deterministic: no network, no randomness, no clock — two runs write
// byte-identical output.
const JOKE =
  "I set a stop-loss to protect my trade. The market hunted it in seconds — turns out it's the only thing in my portfolio that ever executed perfectly.";

// Gate rules: 1..200 characters, a single non-blank line.
if (JOKE.length === 0 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} characters (must be 1..200)`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke is blank");
}
if (JOKE.includes("\n")) {
  throw new Error("joke must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Round-trip check: the file on disk must be byte-identical to the joke,
// so a partial write or encoding surprise fails loudly here instead of
// silently producing a bad entry.
const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt round-trip mismatch");
}
if (written.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}
