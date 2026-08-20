#!/usr/bin/env python3
"""
Turn the raw Excalidraw export into an asset the site can actually serve.

The source (`~/Desktop/ubik-prod-design-drive-studio.svg`) is 8.2 MB, and 5.5 MB
of that is fifty PNG screenshots carried as base64. This script does three
things and changes nothing a reader could see:

  1. Re-encodes every embedded PNG to *lossless* WebP. Pixel-identical output,
     roughly 60% smaller. Nothing is resampled, so the screenshots stay as crisp
     as the day they were pasted in.
  2. Rounds path/transform coordinates to one decimal. The canvas is ~73000
     units wide, so a tenth of a unit is far below one device pixel at any zoom
     the viewer allows.
  3. Segments the canvas into regions and writes them out as a TypeScript map,
     so the page can offer waypoints without shipping a parser to the browser.

Everything stays vector: text is still text, strokes are still strokes, and the
Virgil face stays embedded, so the canvas is resolution-independent.

    python3 tools/build-ubik-canvas.py

Writes public/ubik-canvas.svg and lib/ubik-canvas-regions.json.
"""

from __future__ import annotations

import base64
import json
import os
import re
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path.home() / "Desktop" / "ubik-prod-design-drive-studio.svg"
OUT_SVG = ROOT / "public" / "ubik-canvas.svg"
OUT_MAP = ROOT / "lib" / "ubik-canvas-regions.json"

NS = "{http://www.w3.org/2000/svg}"
B64 = re.compile(r'href="data:image/(\w+);base64,([A-Za-z0-9+/=]+)"')
XFORM = re.compile(
    r"translate\(([-\d.e]+)\s+([-\d.e]+)\)\s*rotate\(([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)\)"
)
NUM = re.compile(r"-?\d+\.\d+")


# --------------------------------------------------------------- images


def to_webp(png: bytes, tmp: Path, i: int) -> bytes:
    """Lossless WebP, or the original PNG if it somehow wins."""
    p = tmp / f"{i}.png"
    w = tmp / f"{i}.webp"
    p.write_bytes(png)
    subprocess.run(
        ["cwebp", "-quiet", "-lossless", "-z", "9", "-m", "6", str(p), "-o", str(w)],
        check=True,
    )
    out = w.read_bytes()
    return out if len(out) < len(png) else png


def reencode_images(svg: str) -> tuple[str, int, int]:
    before = after = 0
    chunks: list[str] = []
    last = 0
    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        for i, m in enumerate(B64.finditer(svg)):
            fmt, data = m.group(1), m.group(2)
            raw = base64.b64decode(data)
            before += len(raw)
            if fmt == "png":
                new = to_webp(raw, tmp, i)
            else:
                new = raw
            after += len(new)
            mime = "image/webp" if new[:4] == b"RIFF" else f"image/{fmt}"
            enc = base64.b64encode(new).decode("ascii")
            chunks.append(svg[last : m.start()])
            chunks.append(f'href="data:{mime};base64,{enc}"')
            last = m.end()
    chunks.append(svg[last:])
    return "".join(chunks), before, after


# --------------------------------------------------------------- geometry


def trim_precision(svg: str) -> str:
    """One decimal place on path data and transforms. Sub-pixel either way."""

    def shrink(m: re.Match[str]) -> str:
        body = NUM.sub(lambda n: f"{float(n.group()):.1f}".rstrip("0").rstrip("."), m.group(2))
        return f'{m.group(1)}="{body}"'

    return re.sub(r'\b(d|transform)="([^"]*)"', shrink, svg)


def elements(svg: str) -> list[dict]:
    """
    Every top-level group, with an exact bounding box.

    Excalidraw writes `translate(x y) rotate(deg cx cy)` where the rotation
    centre is the element's own half-width and half-height, so the box falls
    straight out of the transform. No path maths required.
    """
    lean = re.sub(r"base64,[A-Za-z0-9+/=]+", "base64,X", svg)
    lean = re.sub(r"<!DOCTYPE[^>]*>", "", lean)
    root = ET.fromstring(lean)
    out: list[dict] = []
    for g in root:
        if g.tag != NS + "g":
            continue
        m = XFORM.search(g.get("transform") or "")
        if not m:
            continue
        x, y, _, cx, cy = (float(v) for v in m.groups())
        texts = [t for t in g.iter(NS + "text")]
        body = " ".join((t.text or "").strip() for t in texts).strip()
        size = max(
            [float((t.get("font-size") or "0").replace("px", "")) for t in texts] or [0.0]
        )
        out.append(
            {
                "x": x,
                "y": y,
                "w": cx * 2,
                "h": cy * 2,
                "t": body,
                "fs": size,
                "k": "text" if body else ("image" if g.find(NS + "use") is not None else "draw"),
            }
        )
    return out


def is_connector(e: dict) -> bool:
    """Arrows and long rules bridge the corridors between areas, so ignore them
    when looking for whitespace. They get folded back into whatever region they
    start in."""
    if e["k"] != "draw":
        return False
    long_side = max(e["w"], e["h"])
    short_side = max(1.0, min(e["w"], e["h"]))
    return long_side > 900 or long_side / short_side > 6


def widest_gap(sub: list[dict], axis: str) -> tuple[float, float | None]:
    key = axis
    span = "w" if axis == "x" else "h"
    spans = sorted((e[key], e[key] + e[span]) for e in sub)
    best: tuple[float, float | None] = (0.0, None)
    edge = spans[0][1]
    for a, b in spans[1:]:
        if a - edge > best[0]:
            best = (a - edge, (edge + a) / 2)
        edge = max(edge, b)
    return best


def segment(sub: list[dict], min_gap: float, out: list | None = None, depth: int = 0) -> list:
    """Recursive whitespace cuts: split on the widest empty corridor until none
    is wide enough to mean anything. It reads the layout the way a person does."""
    if out is None:
        out = []
    if len(sub) <= 4 or depth > 12:
        out.append(sub)
        return out
    gy = widest_gap(sub, "y")
    gx = widest_gap(sub, "x")
    gap, axis = (gy, "y") if gy[0] >= gx[0] else (gx, "x")
    if gap[0] < min_gap or gap[1] is None:
        out.append(sub)
        return out
    a = [e for e in sub if e[axis] < gap[1]]
    b = [e for e in sub if e[axis] >= gap[1]]
    if not a or not b:
        out.append(sub)
        return out
    segment(a, min_gap, out, depth + 1)
    segment(b, min_gap, out, depth + 1)
    return out


def box(sub: list[dict]) -> dict:
    x0 = min(e["x"] for e in sub)
    y0 = min(e["y"] for e in sub)
    x1 = max(e["x"] + e["w"] for e in sub)
    y1 = max(e["y"] + e["h"] for e in sub)
    labels = sorted((e for e in sub if e["t"]), key=lambda e: -e["fs"])
    return {
        "x": round(x0),
        "y": round(y0),
        "w": round(x1 - x0),
        "h": round(y1 - y0),
        "n": len(sub),
        "text": [e["t"] for e in labels[:10]],
    }


def normalise_root(svg: str) -> str:
    """
    Make the root width and height agree with the viewBox.

    Excalidraw exports at 3x, so the root advertises an intrinsic size of about
    218700 x 246000. Nothing renders at that size, but it is the number a
    browser reaches for when it decides how large a raster to allocate for an
    SVG used as an image, and fifty-three gigapixels is not a raster anyone can
    allocate. The result is a silent black frame. The viewBox is untouched, so
    the drawing is identical; only the declared size changes.
    """
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
    if not m:
        return svg
    w, h = float(m.group(1)), float(m.group(2))
    return re.sub(
        r'width="[\d.]+" height="[\d.]+"',
        f'width="{w:.2f}" height="{h:.2f}"',
        svg,
        count=1,
    )


def main() -> int:
    if not SRC.exists():
        print(f"missing source: {SRC}", file=sys.stderr)
        return 1

    svg = SRC.read_text(encoding="utf-8")
    print(f"source            {len(svg)/1e6:6.2f} MB")

    els = elements(svg)
    content = [e for e in els if not is_connector(e)]
    regions = [box(s) for s in segment(content, 400)]
    regions.sort(key=lambda r: (r["y"], r["x"]))
    OUT_MAP.write_text(json.dumps(regions, indent=1), encoding="utf-8")
    print(f"regions           {len(regions)} from {len(els)} elements")

    svg, before, after = reencode_images(svg)
    print(f"images            {before/1e6:6.2f} MB -> {after/1e6:5.2f} MB lossless webp")

    svg = trim_precision(svg)
    svg = svg.replace("<!-- svg-source:excalidraw -->", "").replace("<metadata></metadata>", "")
    svg = normalise_root(svg)

    OUT_SVG.parent.mkdir(parents=True, exist_ok=True)
    OUT_SVG.write_text(svg, encoding="utf-8")
    print(f"public/ubik-canvas.svg  {OUT_SVG.stat().st_size/1e6:6.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
