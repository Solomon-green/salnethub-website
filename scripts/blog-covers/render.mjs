// Renders a blog cover from scripts/blog-covers/<name>.html to public/blog/<name>.png (1600 x 900).
// Usage: node scripts/blog-covers/render.mjs <name> [output dir, default public/blog]
// In the HTML, {{icon:slug}} becomes that Simple Icons logo in its brand colour (e.g. {{icon:n8n}}).
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as icons from "simple-icons";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const name = process.argv[2];
if (!name) {
  console.error("Usage: node scripts/blog-covers/render.mjs <name>");
  process.exit(1);
}

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const html = readFileSync(join(here, `${name}.html`), "utf8").replace(/\{\{icon:([a-z0-9]+)\}\}/g, (_, slug) => {
  const icon = Object.values(icons).find((i) => i && i.slug === slug);
  if (!icon) throw new Error(`Unknown Simple Icons slug: ${slug}`);
  return `<svg viewBox="0 0 24 24" fill="#${icon.hex}" role="img" aria-label="${icon.title}"><path d="${icon.path}"/></svg>`;
});

// Written next to the template so cover.css and the font files resolve by relative path.
const page = join(here, `.${name}.render.html`);
writeFileSync(page, html);
const out = mkdtempSync(join(tmpdir(), "cover-"));
const shot = join(out, "cover.png");
try {
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1600,900",
    "--virtual-time-budget=4000",
    `--screenshot=${shot}`,
    pathToFileURL(page).href,
  ], { stdio: "ignore" });
  const dest = join(root, process.argv[3] || "public/blog", `${process.argv[4] || name}.png`);
  copyFileSync(shot, dest);
  console.log(`Cover written to ${dest}`);
} finally {
  rmSync(page, { force: true });
  rmSync(out, { recursive: true, force: true });
}
