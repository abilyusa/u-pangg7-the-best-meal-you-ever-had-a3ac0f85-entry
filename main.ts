import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sentence =
  "The best meal I ever had was nasi goreng on a plastic stool in Bandung, its yolk breaking over smoky rice as motorbikes roared past and the vendor laughed at my second helping.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-200
// characters, not only white space, and exactly one sentence.
// Fail loudly here rather than writing an entry the scorer would reject.
if (sentence.length < 1 || sentence.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${sentence.length}.`);
}
if (sentence.trim().length === 0 || sentence.includes("\n")) {
  throw new Error("Entry must be a single non-blank line.");
}
if ((sentence.match(/\./g) || []).length !== 1 || !sentence.endsWith(".")) {
  throw new Error("Entry must be exactly one sentence ending in a period.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), sentence, "utf8");
