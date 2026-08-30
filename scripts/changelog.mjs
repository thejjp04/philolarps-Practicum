/**
 * Regenerates CHANGELOG.md from the commit history, grouped by the day the
 * work was done. Run `npm run changelog` before pushing.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const REPO = "https://github.com/thejjp04/philolarps";
const SEP = "";

const log = execFileSync(
  "git",
  ["log", "--no-merges", `--format=%ad${SEP}%h${SEP}%s`, "--date=short"],
  { encoding: "utf8" },
);

const days = new Map();
for (const line of log.split("\n")) {
  if (!line.trim()) continue;
  const [date, hash, subject] = line.split(SEP);
  if (!days.has(date)) days.set(date, []);
  days.get(date).push({ hash, subject });
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** 2026-08-30 -> 30 August 2026 */
function readableDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

const out = [
  "# Changelog",
  "",
  "Every change to the site, newest first, grouped by the day it was made.",
  "Each entry links to the exact diff.",
  "",
  "Regenerate with `npm run changelog`.",
  "",
];

for (const [date, commits] of days) {
  out.push(`## ${readableDate(date)}`, "");
  const label = commits.length === 1 ? "1 change" : `${commits.length} changes`;
  out.push(`${label}.`, "");
  for (const { hash, subject } of commits) {
    out.push(`- ${subject} ([${hash}](${REPO}/commit/${hash}))`);
  }
  out.push("");
}

writeFileSync("CHANGELOG.md", out.join("\n"));
console.log(`Wrote CHANGELOG.md: ${days.size} days, ${log.trim().split("\n").length} commits.`);
