import { existsSync, copyFileSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GAME_GIF = join(ROOT, "game.gif");
const FRAME_PNG = join(ROOT, "assets", "terminal-frame-860.png");
const TMP_OUT = join(ROOT, "game_framed_tmp.gif");

export function frameSpaceGame() {
  if (!existsSync(GAME_GIF)) {
    console.error(`Source game.gif not found at: ${GAME_GIF}`);
    process.exit(1);
  }

  if (!existsSync(FRAME_PNG)) {
    console.log("Terminal frame template not found, generating...");
    execSync(`node "${join(ROOT, "scripts/build-frame-template.mjs")}"`, { stdio: "inherit" });
  }

  console.log("Compositing actual space game into Cyber Terminal frame via ffmpeg...");
  const cmd = `ffmpeg -v error -i "${GAME_GIF}" -i "${FRAME_PNG}" -filter_complex "[0:v]pad=860:308:0:62:color=0x0D1117[bg];[bg][1:v]overlay=0:0,split[s0][s1];[s0]palettegen=max_colors=128:reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" -y "${TMP_OUT}"`;
  
  execSync(cmd, { stdio: "inherit" });

  // Overwrite game.gif with the framed game.gif
  copyFileSync(TMP_OUT, GAME_GIF);
  unlinkSync(TMP_OUT);

  console.log("Successfully framed game.gif with Cyber Terminal window and controls!");
}

if (process.argv[1]?.endsWith("frame-space-game.mjs")) {
  frameSpaceGame();
}
