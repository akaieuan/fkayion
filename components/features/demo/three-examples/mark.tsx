'use client'

import { useEffect, useRef } from 'react'

/**
 * The liquid orb as a plate mark: the same object the write-up runs, on its
 * card.
 *
 * Not three.js. The full orb is chunk-split so no route but its own write-up
 * downloads a byte of it, and a plate on /demo must not undo that. So the
 * scene is restated as one raw WebGL fragment shader: a raymarched sphere
 * carrying the orb's own vertex displacement (the three sine waves, the fbm
 * bulge, the viscous vertical stretch) and its own fragment shading (the
 * fresnel foam, the scatter from above, the cavity shadow, the grain, the
 * contrast and saturation push), with the same yaw, rock, float and pulse the
 * orb's frame loop applies. Same constants, same palette, same silhouette.
 *
 * What is dropped is what a 156px plate cannot show: three octaves of noise
 * where the orb runs six, and the three clearcoat droplets, which at this size
 * are a pixel each.
 *
 * House behaviors, same as the roundabout plate: the loop pauses offscreen and
 * on hidden tabs, reduced motion renders one mid-flow frame, and the buffer is
 * clamped. Colors are art-layer constants: the orb keeps its greens on both
 * themes, the way Prospect Park does.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float t;
uniform vec2 res;

/* The orb's own constants, from liquid-morph-orb.tsx. */
const vec3 BASE = vec3(0.133, 0.400, 0.267);   /* #226644 */
const vec3 LIQUID = vec3(0.267, 0.867, 0.667); /* #44ddaa */
const vec3 FOAM = vec3(1.0, 1.0, 1.0);
const float FLOW = 0.6;
const float VISC = 0.5;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(
      mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
      f.y
    ),
    mix(
      mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
      f.y
    ),
    f.z
  );
}

/* Three octaves, not the orb's six: the rest fall under a pixel here, and
   this runs once per raymarch step rather than once per vertex. */
float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

/* The body's rotation, from the orb's frame loop: steady yaw, rocking pitch. */
vec3 body(vec3 p) {
  float ay = t * 0.5;
  float cy = cos(ay);
  float sy = sin(ay);
  p = vec3(cy * p.x - sy * p.z, p.y, sy * p.x + cy * p.z);
  float ax = sin(t * 1.8) * 0.2;
  float cx = cos(ax);
  float sx = sin(ax);
  return vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
}

/* The orb's vertex stage, read as a distance field instead of as vertices. */
float map(vec3 wp) {
  vec3 p = body(wp);
  p.y -= sin(t * 3.0 + p.y * 5.0) * VISC * 0.6 * FLOW;
  float waves = sin(p.x * 8.0 + t * 4.0) * 0.30
              + sin(p.z * 6.0 + t * 3.5) * 0.25
              + sin(p.y * 10.0 + t * 5.0) * 0.15;
  float bulge = fbm(p * 2.5 + t * 2.0) * 0.45;
  return length(p) - 1.0 - (waves + bulge) * FLOW;
}

/* Tetrahedral taps: four field samples for the normal rather than six. */
vec3 normalAt(vec3 p) {
  vec2 k = vec2(1.0, -1.0);
  float e = 0.004;
  return normalize(
    k.xyy * map(p + k.xyy * e) +
    k.yyx * map(p + k.yyx * e) +
    k.yxy * map(p + k.yxy * e) +
    k.xxx * map(p + k.xxx * e)
  );
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - res) / min(res.x, res.y);

  /* The float and the pulse, from the same frame loop, damped: a plate frame
     is tight and the orb must not touch its own edges. */
  float bob = sin(t * 2.0) * 0.06 + sin(t * 3.2) * 0.025;
  float pulse = 1.0 + sin(t * 4.0) * 0.04 + sin(t * 6.0) * 0.02;

  vec3 ro = vec3(0.0, 0.0, 4.0);
  vec3 rd = normalize(vec3(uv * 0.52, -1.0));

  /* Bounding sphere first. The displacement reaches about 0.7 beyond the
     radius, so nothing outside 1.85 can be the orb and costs nothing. */
  float b = dot(ro, rd);
  float c = dot(ro, ro) - 1.85 * 1.85;
  float h = b * b - c;
  if (h < 0.0) discard;
  h = sqrt(h);
  float far = -b + h;

  float travelled = max(-b - h, 0.0);
  bool hit = false;
  vec3 p = vec3(0.0);
  for (int i = 0; i < 56; i++) {
    p = ro + rd * travelled;
    p.y -= bob;
    p /= pulse;
    float d = map(p);
    if (d < 0.0025) {
      hit = true;
      break;
    }
    /* Sphere tracing overshoots here: a sine stack at this amplitude has a
       gradient well past one, so the step is scaled down and floored. */
    travelled += max(d * pulse * 0.34, 0.013);
    if (travelled > far) break;
  }
  if (!hit) discard;

  /* The orb's fragment stage, ported. vFlow is constant on a plate: nothing
     here is hovered, so the flow term never lifts off its base. */
  vec3 n = normalAt(p);
  vec3 op = body(p);

  vec3 col = mix(BASE, LIQUID, smoothstep(0.3, 0.9, FLOW));
  float fres = pow(1.0 - max(0.0, dot(n, -rd)), 1.8);
  col = mix(col, FOAM, fres * (0.3 + FLOW * 0.9));

  float ripple = sin(op.x * 30.0 + t * 8.0) * sin(op.z * 25.0 + t * 6.0) * FLOW * 0.4;
  col += ripple * FOAM;

  float up = max(0.0, dot(n, vec3(0.0, 1.0, 0.0)));
  col = mix(col, LIQUID * 1.8, up * FLOW * 0.8);
  col = mix(col, vec3(0.0), (1.0 - up) * FLOW * 0.3);

  col += (hash(vec3(gl_FragCoord.xy, fract(t) * 90.0)) - 0.5) * 0.06;

  col = pow(max(col, 0.0), vec3(1.3));
  col = mix(vec3(0.1), col, 1.3);
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, 1.6);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 0.96);
}
`

export function LiquidOrbMark({ size = 200, className }: { size?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    canvas.width = Math.round(size * dpr)
    canvas.height = Math.round(size * dpr)

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
      /* Keep the buffer readable after present, so the page (and anything
         inspecting it) can sample the plate. */
      preserveDrawingBuffer: true,
    })

    /* No WebGL: one quiet disc in the palette, so the plate is never empty.
       Static is fine — a context that cannot run shaders is not one to
       animate in. */
    if (!gl) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const c = canvas.width / 2
      const grad = ctx.createRadialGradient(c, c * 0.8, c * 0.1, c, c, c * 0.62)
      grad.addColorStop(0, '#44ddaa')
      grad.addColorStop(1, '#226644')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(c, c, c * 0.6, 0, Math.PI * 2)
      ctx.fill()
      return
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
    }

    const vert = compile(gl.VERTEX_SHADER, VERT)
    const frag = compile(gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vert || !frag || !program) return
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const tLoc = gl.getUniformLocation(program, 't')
    gl.uniform2f(gl.getUniformLocation(program, 'res'), canvas.width, canvas.height)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)

    const draw = (seconds: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(tLoc, seconds)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    /* No loseContext() in cleanup. A canvas hands back the same context object
       forever, so losing it on unmount leaves a remount of the same element
       (StrictMode's double effect, for one) drawing into a dead context. One
       small context is cheap, and the browser reclaims it with the canvas. */

    /* One frame before any gating: rAF does not fire in a hidden tab, so a
       plate opened in a background tab would otherwise sit empty until the tab
       was fronted. Mid-flow, the same frame reduced motion gets. */
    draw(11.7)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Half rate. This marches a distance field per pixel rather than pushing
       a few thousand vertices, and the orb's motion is slow enough that the
       difference is invisible at plate size — where the saved milliseconds,
       across a grid of plates, are not. */
    const STEP_MS = 1000 / 30

    let raf = 0
    let visible = true
    let last = -Infinity
    const frame = (ms: number) => {
      if (ms - last >= STEP_MS) {
        last = ms
        draw(ms / 1000)
      }
      raf = requestAnimationFrame(frame)
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      if (visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
      sync()
    })
    observer.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
