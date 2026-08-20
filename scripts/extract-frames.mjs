import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEQUENCE_DIR = path.join(ROOT, "public", "sequence");
const FRAME_COUNT = 240;
const DEFAULT_VIDEO_DIR = path.join(ROOT, "public", "videos");

function newestClip(dir) {
  return readdirSync(dir)
    .filter((name) => name.toLowerCase().endsWith(".mp4"))
    .map((name) => path.join(dir, name))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
}

function probeDuration(clip) {
  let stderr = "";
  try {
    execFileSync(ffmpegPath, ["-hide_banner", "-i", clip], {
      encoding: "utf8",
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch (error) {
    stderr = String(error.stderr ?? "");
  }
  const match = stderr.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (!match) {
    throw new Error(`Could not read duration from ${clip}`);
  }
  const [h, m, s] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const video = stderr.match(/Video:\s*([^,]+),\s*([^,]+),\s*(\d+)x(\d+)/);
  return {
    duration: h * 3600 + m * 60 + s,
    codec: video?.[1] ?? "unknown",
    fps: video?.[2] ?? "unknown",
    width: Number(video?.[3] ?? 0),
    height: Number(video?.[4] ?? 0),
  };
}

const clipArg = process.argv[2];
const clip = clipArg
  ? path.resolve(clipArg)
  : newestClip(DEFAULT_VIDEO_DIR);

if (!clip || !existsSync(clip)) {
  console.error("Clip not found. Pass a path: node scripts/extract-frames.mjs <clip.mp4>");
  process.exit(1);
}

const info = probeDuration(clip);
const fps = (FRAME_COUNT / info.duration).toFixed(6);

console.log(`Clip:    ${clip}`);
console.log(`Duration: ${info.duration.toFixed(2)}s | ${info.width}x${info.height} | ${info.codec}`);
console.log(`Frames:  ${FRAME_COUNT} @ ${fps} fps (resampled from source)`);

mkdirSync(SEQUENCE_DIR, { recursive: true });

execFileSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    clip,
    "-vf",
    `fps=${fps}`,
    "-frames:v",
    String(FRAME_COUNT),
    "-c:v",
    "libwebp",
    "-quality",
    "90",
    "-compression_level",
    "4",
    path.join(SEQUENCE_DIR, "frame-%04d.webp"),
  ],
  { stdio: ["ignore", "inherit", "inherit"] },
);

const frames = readdirSync(SEQUENCE_DIR)
  .filter((name) => /^frame-\d{4}\.webp$/.test(name))
  .sort();

const totalBytes = frames.reduce(
  (sum, name) => sum + statSync(path.join(SEQUENCE_DIR, name)).size,
  0,
);

console.log(`\nExtracted ${frames.length}/${FRAME_COUNT} frames into public/sequence/`);
console.log(`Total size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

if (frames.length !== FRAME_COUNT) {
  console.error(`Expected ${FRAME_COUNT} frames, got ${frames.length}`);
  process.exit(1);
}

console.log(`First: ${frames[0]} (${(statSync(path.join(SEQUENCE_DIR, frames[0])).size / 1024).toFixed(1)} KB)`);
console.log(`Last:  ${frames[frames.length - 1]} (${(statSync(path.join(SEQUENCE_DIR, frames[frames.length - 1])).size / 1024).toFixed(1)} KB)`);