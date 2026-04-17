import { readFileSync, writeFileSync } from "fs";

const csv = readFileSync("/Users/reubendongre/Downloads/11 Plus Vocabulary.csv", "utf8");

const lines = csv.trim().split("\n").slice(1); // skip header

const data = { A: { synonyms: [], antonyms: [] }, B: { synonyms: [], antonyms: [] }, C: { synonyms: [], antonyms: [] } };

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).trim();
}

function firstMatch(cell) {
  if (!cell || cell.trim() === "") return null;
  // strip surrounding quotes if any
  const clean = cell.replace(/^"|"$/g, "").trim();
  const first = clean.split(",")[0].trim();
  return first ? cap(first) : null;
}

// Parse a CSV line respecting quoted fields
function parseLine(line) {
  const fields = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuote = !inQuote; continue; }
    if (ch === "," && !inQuote) { fields.push(cur); cur = ""; continue; }
    cur += ch;
  }
  fields.push(cur);
  return fields;
}

for (const line of lines) {
  if (!line.trim()) continue;
  const [wordRaw, synonymsRaw, antonymsRaw, levelRaw] = parseLine(line);

  const word     = cap(wordRaw);
  const synonym  = firstMatch(synonymsRaw);
  const antonym  = firstMatch(antonymsRaw);
  const level    = (levelRaw || "").trim();

  if (!word || !level) continue;

  if (level === "A" || level === "B" || level === "C") {
    if (synonym) data[level].synonyms.push({ word, match: synonym });
    if (antonym) data[level].antonyms.push({ word, match: antonym });
  } else if (level === "A-B") {
    if (antonym) data["A"].antonyms.push({ word, match: antonym });
    if (synonym) data["B"].synonyms.push({ word, match: synonym });
  } else if (level === "B-C") {
    if (antonym) data["B"].antonyms.push({ word, match: antonym });
    if (synonym) data["C"].synonyms.push({ word, match: synonym });
  }
}

// Summary
for (const lvl of ["A", "B", "C"]) {
  console.log(`Level ${lvl}: ${data[lvl].synonyms.length} synonyms, ${data[lvl].antonyms.length} antonyms`);
}

const output = `// Auto-generated from "11 Plus Vocabulary.csv"
export const wordData = ${JSON.stringify(data, null, 2)};
`;

writeFileSync("/Users/reubendongre/11plus-app/src/data/words.js", output, "utf8");
console.log("\nwords.js written successfully.");
