#!/usr/bin/env node
/*
 * Renders public/opengraph-image.png, the share card for WhatsApp, X,
 * LinkedIn, and everything else that reads og:image.
 *
 * The card is drawn in HTML and screenshotted rather than assembled from
 * primitives, because the identity lives in the type: Geist Pixel is the same
 * face the hero runs in, and a rasteriser without it would be a different site.
 * The face is read out of the build output, so the hashed filename never has
 * to be known here. Run `npm run build` first, then `node scripts/make-og.mjs`.
 *
 * Requires playwright (npm i -D playwright); it is a build tool, not a runtime
 * dependency, which is why it is not in dependencies.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public", "opengraph-image.png");

async function loadChromium() {
  try {
    return (await import("playwright")).chromium;
  } catch {
    console.error("playwright is missing. Install it once with: npm i -D playwright");
    process.exit(1);
  }
}

/*
 * Locates the basic-latin woff2 for a family inside .next/static/chunks/*.css.
 * A family ships one face per unicode subset; the card is ASCII, so the
 * U+?? block is the only one worth loading.
 */
async function fontFile(family) {
  const chunksDir = path.join(root, ".next", "static", "chunks");
  const cssFiles = (await readdir(chunksDir)).filter((file) => file.endsWith(".css"));

  for (const file of cssFiles) {
    const cssPath = path.join(chunksDir, file);
    const css = await readFile(cssPath, "utf8");
    const faces = css.split("@font-face").slice(1);
    const own = faces.filter((face) => face.includes(`font-family:${family}`));
    if (own.length === 0) continue;

    const latin = own.find((face) => face.includes("unicode-range:U+??")) ?? own[0];
    const match = latin.match(/url\(([^)]+\.woff2)\)/);
    if (match) return path.resolve(path.dirname(cssPath), match[1]);
  }

  throw new Error(`${family} not found in build output. Run npm run build first.`);
}

const cell = (count, ink) => `<span style="color:${ink}">${"█".repeat(count)}</span>`;

const html = (pixelUrl, sansUrl) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Geist Pixel"; src: url("${pixelUrl}") format("woff2"); font-weight: 400; }
  @font-face { font-family: "Geist"; src: url("${sansUrl}") format("woff2"); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background: #05050a; color: #f2efe7; font-family: "Geist", sans-serif;
  }
  /* Bezel and scanlines: the card is the screen, not a poster of one. */
  .bezel { position: absolute; inset: 22px; border: 1px solid rgba(242, 239, 231, 0.16); }
  .scan {
    position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,0) 0 3px, rgba(0,0,0,0.16) 3px 4px);
  }
  .sheet {
    position: absolute; inset: 0; padding: 64px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .meta {
    display: flex; justify-content: space-between;
    font-family: "Geist Pixel"; font-size: 19px; letter-spacing: 0.24em;
    text-transform: uppercase; color: #9a978f;
  }
  .wordmark { font-family: "Geist Pixel"; font-size: 148px; line-height: 1; }
  .sub { margin-top: 26px; font-size: 37px; color: #d4d4d8; letter-spacing: 0.01em; }
  .foot { display: flex; align-items: flex-end; justify-content: space-between; }
  .bar { font-family: "Geist Pixel"; font-size: 34px; line-height: 1; letter-spacing: 0.06em; }
  .loc { font-family: "Geist Pixel"; font-size: 19px; letter-spacing: 0.24em; text-transform: uppercase; color: #9a978f; white-space: nowrap; }
</style></head>
<body>
  <div class="sheet">
    <div class="meta"><span>portfolio</span><span>www.rifqisakha.my.id</span></div>
    <div>
      <div class="wordmark">sakhandaru</div>
      <div class="sub">ui/ux designer &amp; full-stack developer</div>
    </div>
    <div class="foot">
      <div class="bar">${cell(16, "#f2efe7")}${cell(4, "rgba(239,236,226,0.16)")}</div>
      <span class="loc">semarang, indonesia</span>
    </div>
  </div>
  <div class="bezel"></div>
  <div class="scan"></div>
</body></html>`;

const pixel = await fontFile("Geist Pixel");
const sans = await fontFile("Geist");

const browser = await (await loadChromium()).launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html(pixel, sans))}`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT, type: "png" });
await browser.close();

const bytes = (await readFile(OUT)).length;
console.log(`wrote ${path.relative(root, OUT)} (${(bytes / 1024).toFixed(0)} KB)`);
