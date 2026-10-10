import fs from "node:fs";
import path from "node:path";
import katex from "katex";

const CONTENT = path.join(process.cwd(), "content");
const only = process.argv[2];
const problems = [];
let files = 0;
let questions = 0;
let checks = 0;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingIds(source) {
  const ids = new Set();
  let fence = false;
  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) fence = !fence;
    if (fence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    ids.add(
      slugify(
        m[2]
          .replace(/`([^`]+)`/g, "$1")
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"),
      ),
    );
  }
  return ids;
}

function checkText(where, text) {
  if (typeof text !== "string" || text.trim() === "") {
    problems.push(`${where}: must be a non-empty string`);
    return;
  }
  if (/[\u0000-\u001f]/.test(text)) {
    problems.push(`${where}: contains a control character, so a LaTeX backslash was probably not doubled (write \\\\neg, not \\neg)`);
  }
  if (text.includes("—")) problems.push(`${where}: contains an em dash`);
  const dollars = (text.match(/\$/g) ?? []).length;
  if (dollars % 2 !== 0) problems.push(`${where}: unbalanced $ math delimiters`);
  for (const m of text.matchAll(/\$([^$]+)\$/g)) {
    try {
      katex.renderToString(m[1], { throwOnError: true });
    } catch (e) {
      problems.push(`${where}: KaTeX cannot render $${m[1]}$ (${e.message.split("\n")[0]})`);
    }
  }
}

for (const subject of fs.readdirSync(CONTENT)) {
  if (only && subject !== only) continue;
  const subjectDir = path.join(CONTENT, subject);
  if (!fs.statSync(subjectDir).isDirectory()) continue;

  for (const tier of ["beginner", "intermediate", "advanced"]) {
    const dir = path.join(subjectDir, tier);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);

      if (file.endsWith(".mdx")) {
        const source = fs.readFileSync(full, "utf8");
        const quizFile = full.replace(/\.mdx$/, ".quiz.json");
        const used = [...source.matchAll(/<Check\s+id="([^"]+)"\s*\/>/g)].map((m) => m[1]);
        checks += used.length;
        if (used.length === 0) continue;
        const ids = fs.existsSync(quizFile)
          ? new Set(JSON.parse(fs.readFileSync(quizFile, "utf8")).map((q) => q.id))
          : new Set();
        const seen = new Set();
        for (const id of used) {
          if (!ids.has(id)) problems.push(`${subject}/${tier}/${file}: <Check id="${id}" /> has no question with that id`);
          if (seen.has(id)) problems.push(`${subject}/${tier}/${file}: <Check id="${id}" /> appears twice`);
          seen.add(id);
        }
        continue;
      }

      if (!file.endsWith(".quiz.json")) continue;
      files += 1;
      const rel = `${subject}/${tier}/${file}`;
      const mdx = full.replace(/\.quiz\.json$/, ".mdx");
      if (!fs.existsSync(mdx)) {
        problems.push(`${rel}: no matching .mdx article`);
        continue;
      }
      const sections = headingIds(fs.readFileSync(mdx, "utf8"));

      let data;
      try {
        data = JSON.parse(fs.readFileSync(full, "utf8"));
      } catch (e) {
        problems.push(`${rel}: invalid JSON (${e.message})`);
        continue;
      }
      if (!Array.isArray(data) || data.length === 0) {
        problems.push(`${rel}: must be a non-empty array of questions`);
        continue;
      }

      const multi = data.filter((q) => Array.isArray(q?.options) && q.options.length > 2);
      for (const [word, beats] of [
        ["longest", (a, b) => a > b],
        ["shortest", (a, b) => a < b],
      ]) {
        const odd = multi.filter((q) =>
          q.options.every((o, j) => j === q.answer || beats(String(q.options[q.answer]).length, String(o).length)),
        );
        if (multi.length >= 4 && odd.length / multi.length > 0.4) {
          problems.push(
            `${rel}: the correct option is the ${word} in ${odd.length} of ${multi.length} multiple-choice questions, which gives answers away (max 40%). Rebalance: ${odd.map((q) => q.id).join(", ")}`,
          );
        }
      }

      const ids = new Set();
      data.forEach((q, i) => {
        questions += 1;
        const where = `${rel} [${q?.id ?? i}]`;
        const allowed = new Set(["id", "section", "question", "options", "answer", "explanation"]);
        for (const k of Object.keys(q ?? {})) {
          if (!allowed.has(k)) problems.push(`${where}: unknown field "${k}"`);
        }
        if (typeof q.id !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(q.id)) {
          problems.push(`${where}: id must be kebab-case`);
        } else if (ids.has(q.id)) {
          problems.push(`${where}: duplicate id`);
        }
        ids.add(q.id);
        if (q.section !== undefined && !sections.has(q.section)) {
          problems.push(`${where}: section "${q.section}" is not a heading id in the article (have: ${[...sections].join(", ")})`);
        }
        checkText(`${where}.question`, q.question);
        checkText(`${where}.explanation`, q.explanation);
        if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 5) {
          problems.push(`${where}: needs 2 to 5 options`);
        } else {
          q.options.forEach((o, j) => checkText(`${where}.options[${j}]`, o));
          if (new Set(q.options).size !== q.options.length) problems.push(`${where}: duplicate options`);
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
            problems.push(`${where}: answer must be an index into options`);
          }
        }
      });
    }
  }
}

if (problems.length > 0) {
  console.error(`Quiz check failed with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`Quiz check passed: ${files} files, ${questions} questions, ${checks} in-article checks.`);
