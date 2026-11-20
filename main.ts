import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Entry for the gta6-meme-x-01 bounty: the deliverable is POST.json,
// which holds the URL of the public X post carrying the meme image.
// The URL is filled in after the entrant posts the meme on X.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

const raw = readFileSync(source, "utf8");
const post = JSON.parse(raw);
if (typeof post.url !== "string" || !post.url.startsWith("https://")) {
  throw new Error("POST.json must contain an https url field");
}
if (!post.url.includes("/status/")) {
  throw new Error("POST.json url must point at an X post (/status/<id>)");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, raw);
console.log(`POST.json copied to ${target}`);
