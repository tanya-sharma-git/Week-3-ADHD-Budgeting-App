// Skills gate-check (the "bouncer").
// Makes sure Penny Pal's 3 Week 1 skills are present and each still has a
// valid header (a name and a description). If any skill is missing or its
// header is broken, this script FAILS, which fails the pipeline.
import { readFileSync, existsSync } from "node:fs";

// The guest list: the 3 skills that must always be present.
const REQUIRED_SKILLS = ["accessibility", "design-systems", "security"];

const problems = [];

for (const skill of REQUIRED_SKILLS) {
  const path = `skills/${skill}/SKILL.md`;

  // Check 1: the skill file is present.
  if (!existsSync(path)) {
    problems.push(`Missing: ${path}`);
    continue;
  }

  // Check 2: it has a header block with a name and a description.
  const text = readFileSync(path, "utf8");
  const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!header) {
    problems.push(`${path}: no header block found`);
    continue;
  }
  if (!/\bname:\s*\S/.test(header[1])) {
    problems.push(`${path}: header is missing a name`);
  }
  if (!/\bdescription:\s*\S/.test(header[1])) {
    problems.push(`${path}: header is missing a description`);
  }
}

// Report the result.
if (problems.length > 0) {
  console.error("Skills gate-check FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1); // a non-zero exit tells the pipeline "this failed"
}

console.log(
  `Skills gate-check passed: all ${REQUIRED_SKILLS.length} skills present and valid.`,
);
