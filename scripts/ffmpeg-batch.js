#!/usr/bin/env node
/**
 * Batch MP4 -> WebM converter using native ffmpeg (vp9 + opus).
 * Prereq: ffmpeg installed (or provide FFMPEG_BIN env). Falls back to ffmpeg-static.
 *
 * Usage:
 *   npm run ffmpeg:convert -- --input ./videos --output ./out --crf 30 --vbitrate 0 --abitrate 128k
 *   npm run ffmpeg:convert -- --input ./videos/file.mp4 --output ./out
 */
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegStatic from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const opts = {
  input: null,
  output: path.resolve(process.cwd(), 'output-webm'),
  crf: '30',
  vbitrate: '0', // 0 lets CRF drive quality for VP9
  abitrate: '128k',
  vcodec: 'libvpx-vp9',
  acodec: 'libopus',
};

for (let i = 0; i < args.length; i++) {
  const [key, val] = args[i].split('=');
  const eat = (next) => {
    if (val !== undefined) return val;
    const n = args[i + 1];
    if (!n || n.startsWith('--')) throw new Error(`Missing value for ${key}`);
    i += 1;
    return n;
  };
  switch (key) {
    case '--input':
      opts.input = path.resolve(process.cwd(), eat());
      break;
    case '--output':
      opts.output = path.resolve(process.cwd(), eat());
      break;
    case '--crf':
      opts.crf = eat();
      break;
    case '--vbitrate':
    case '--vb':
      opts.vbitrate = eat();
      break;
    case '--abitrate':
    case '--ab':
      opts.abitrate = eat();
      break;
    case '--vcodec':
      opts.vcodec = eat();
      break;
    case '--acodec':
      opts.acodec = eat();
      break;
    default:
      if (key.startsWith('--')) {
        console.warn(`Unknown option ${key} (ignored)`);
      }
  }
}

if (!opts.input) {
  console.error('Error: --input <file|dir> is required');
  process.exit(1);
}

const ffmpegBin = process.env.FFMPEG_BIN || ffmpegStatic || 'ffmpeg';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listInputs(inputPath) {
  const stat = await fs.stat(inputPath);
  if (stat.isDirectory()) {
    const files = await fs.readdir(inputPath);
    return files
      .filter(f => f.toLowerCase().endsWith('.mp4'))
      .map(f => path.join(inputPath, f));
  }
  return [inputPath];
}

function runFfmpeg({ input, output }) {
  return new Promise((resolve, reject) => {
    const args = [
      '-i', input,
      '-c:v', opts.vcodec,
      '-crf', opts.crf,
      '-b:v', opts.vbitrate,
      '-c:a', opts.acodec,
      '-b:a', opts.abitrate,
      '-y',
      output,
    ];

    console.log(`\n[ffmpeg] ${path.basename(input)} -> ${path.basename(output)}`);
    const proc = spawn(ffmpegBin, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  const inputs = await listInputs(opts.input);
  if (inputs.length === 0) {
    console.error('No MP4 files found to convert.');
    process.exit(1);
  }
  await ensureDir(opts.output);

  console.log(`Using ffmpeg: ${ffmpegBin}`);
  console.log(`Found ${inputs.length} file(s). Output: ${opts.output}`);
  console.log(`Video: ${opts.vcodec}, CRF ${opts.crf}, b:v ${opts.vbitrate}, Audio: ${opts.acodec} ${opts.abitrate}`);

  for (const input of inputs) {
    const base = path.basename(input, path.extname(input));
    const outPath = path.join(opts.output, `${base}.webm`);
    await runFfmpeg({ input, output: outPath });
  }

  console.log('\nAll conversions complete.');
}

main().catch((err) => {
  console.error('Conversion failed:', err?.message || err);
  process.exit(1);
});

