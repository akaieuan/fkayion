# MP4 → WebM Converter

## Native FFmpeg (recommended for batches)
Fastest and most reliable for large bundles. Requires ffmpeg installed locally (or set `FFMPEG_BIN` to your binary). Falls back to `ffmpeg-static` if installed.

```bash
# Convert a directory of .mp4 files to ./output-webm
npm run ffmpeg:convert -- --input ./videos --output ./output-webm

# Single file
npm run ffmpeg:convert -- --input ./videos/clip.mp4 --output ./output-webm

# Tune quality
npm run ffmpeg:convert -- --input ./videos --output ./output-webm --crf 30 --vbitrate 0 --abitrate 128k
```

Defaults:
- Video: `libvpx-vp9`, `-crf 30`, `-b:v 0` (CRF-driven quality)
- Audio: `libopus`, `-b:a 128k`

## Browser MediaRecorder (fallback, real-time)
- Runs entirely in-browser; no install.
- Real-time speed (~1×); good for small/occasional conversions.
- Use the UI at `npm run dev` → http://localhost:5173/.

## Notes
- Set `FFMPEG_BIN=/usr/local/bin/ffmpeg` (or your path) to force a specific ffmpeg.
- Output files are written to the `--output` directory (created if missing).

