import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { C, chrome, corners, svg } from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "assets");
const W = 860, H = 308;
const topBar = 36, hudH = 26, gameY = topBar + hudH, gameH = 230;

const out = [];

// Base window chrome
out.push(chrome(W, H, "omindud@workstation: ~ (chaos-drill)", "chaos-monkey inject --cluster"));

// HUD bar
out.push(`<path d="M0 ${gameY}H${W}" stroke="${C.line}"/>`);
out.push(`<circle cx="22" cy="${topBar + 13}" r="3" fill="#00ff88"/>`);
out.push(`<text class="m" x="32" y="${topBar + 17}" font-size="10" font-weight="700" letter-spacing="1.1" fill="#00ff88">CHAOS DRILL // FAULT INJECTION ACTIVE</text>`);
out.push(`<text class="m" x="${W / 2}" y="${topBar + 17}" text-anchor="middle" font-size="10.5" fill="${C.dim}">SCORE: <tspan font-weight="700" fill="${C.text}">LIVE</tspan> · WAVE: <tspan font-weight="700" fill="#00ff88">07</tspan></text>`);
out.push(`<text class="m" x="${W - 22}" y="${topBar + 17}" text-anchor="end" font-size="10" fill="${C.cyan}">POD_KILLER: random</text>`);

// Bottom bar
const botY = gameY + gameH;
out.push(`<path d="M0 ${botY}H${W}" stroke="${C.line}"/>`);
out.push(`<text class="m" x="22" y="${botY + 11}" font-size="9" fill="${C.dim}">CLUSTER: <tspan fill="#00ff88">HEALTHY (5/5 PODS)</tspan> · FAULT_TOLERANT</text>`);
out.push(`<text class="m" x="${W / 2}" y="${botY + 11}" text-anchor="middle" font-size="9" fill="${C.dim}">DEFENSE: <tspan fill="#00ff88">CONTAINED 100%</tspan></text>`);
out.push(`<text class="m" x="${W - 22}" y="${botY + 11}" text-anchor="end" font-size="9" fill="${C.dim}">SIMULATION: <tspan fill="${C.cyan}">gh-space-shooter</tspan></text>`);

// Cutout hole where game.gif plays
out.push(`<mask id="game-hole"><rect width="${W}" height="${H}" fill="white"/><rect x="0" y="${gameY}" width="${W}" height="${gameH}" fill="black"/></mask>`);

// Corner brackets
out.push(corners(1, 1, W - 2, H - 2, "#00ff88", 6));

const s = svg({
  w: W, h: H, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
  title: "Terminal Frame Template", desc: "Terminal Frame Template for Space Game",
  body: `<g mask="url(#game-hole)">${out.join("\n")}</g>`
});

const svgPath = join(OUT_DIR, "terminal-frame-template.svg");
const pngPath = join(OUT_DIR, "terminal-frame-860.png");

writeFileSync(svgPath, s);
console.log(`Saved SVG template: ${svgPath}`);

execSync(`rsvg-convert -w ${W} "${svgPath}" -o "${pngPath}"`);
console.log(`Rendered PNG template: ${pngPath}`);
