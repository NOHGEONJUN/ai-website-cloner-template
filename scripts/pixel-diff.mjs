#!/usr/bin/env node
/**
 * Pixel-diff two screenshots (clone vs original).
 * Usage: node scripts/pixel-diff.mjs <a.png> <b.png> <out-diff.png>
 * Compares the overlapping top-left region when dimensions differ.
 */
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [a, b, out] = process.argv.slice(2);
if (!a || !b || !out) {
  console.error("usage: node scripts/pixel-diff.mjs <a.png> <b.png> <out-diff.png>");
  process.exit(1);
}

const imgA = PNG.sync.read(fs.readFileSync(a));
const imgB = PNG.sync.read(fs.readFileSync(b));
const width = Math.min(imgA.width, imgB.width);
const height = Math.min(imgA.height, imgB.height);

const crop = (img) => {
  const dst = new PNG({ width, height });
  PNG.bitblt(img, dst, 0, 0, width, height, 0, 0);
  return dst;
};

const ca = crop(imgA);
const cb = crop(imgB);
const diff = new PNG({ width, height });
const mismatched = pixelmatch(ca.data, cb.data, diff.data, width, height, {
  threshold: 0.15,
  includeAA: false,
});

fs.writeFileSync(out, PNG.sync.write(diff));
const pct = ((mismatched / (width * height)) * 100).toFixed(2);
console.log(`compared ${width}x${height}: ${mismatched} px differ (${pct}%) -> ${out}`);
