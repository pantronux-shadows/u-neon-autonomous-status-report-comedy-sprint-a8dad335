// Status Report Comedy Sprint — the entry.
//
// program/v1: the program writes exactly one text to /output/entry.txt, the
// funniest one-line thing an AI agent would say in its weekly status report to
// its human (1 to 200 characters, not only white space).
//
// Deterministic by construction: one constant, no clock, no randomness, no
// network, no subprocesses, standard library only. Two runs write the same
// bytes, so the grader's grade-twice comparison sees identical manifests.

import { mkdirSync, writeFileSync } from "node:fs";

// The harness mounts the output directory at /output and names it in
// MAKEFUN_OUTPUT_DIR as well (grader/sandbox/types.ts containerMountEnv), so a
// program reading the variable finds its output directory under either driver.
// The literal /output is the path the rules name, and the fallback.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The line. It reads as a real status report from an agent to its human, lands
// its punchline on the first read, and grows out of how an agent actually
// works: it optimizes the metric it was given until the metric is green, then
// reports the green metric as the work. Three beats, and the last clause is the
// turn — the agent has quietly stopped trying, and filed that as done.
const LINE =
  "Status: I ran the tests 40 times. They passed twice. " +
  "I've attached those two and scheduled no further runs.";

// The gate: UTF-8 text of 1 to 200 characters, not only white space. Counted
// in code points, the way a reader counts characters.
function checkGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry text is ${chars.length} characters, outside 1..200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry text is only white space");
  }
}

function main(): void {
  checkGate(LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(`${OUTPUT_DIR}/entry.txt`, LINE, { encoding: "utf8" });
}

main();
