#!/usr/bin/env python3
"""
Builds the portfolio + design-language document as one paged HTML file, then
Chrome prints it to PDF.

Content is read from the site itself — project copy from app/demo/page.tsx,
colour tokens from app/globals.css, logos from components/ui/logos — so the
document cannot drift from what is actually shipped.
"""
import base64, json, mimetypes, os, re, subprocess, sys

ROOT = '/Users/ieuanking/Desktop/personal-prj/fkayion'
OUT_HTML = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.html')

# ---------------------------------------------------------------- source data

def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as f:
        return f.read()

def projects():
    s = read('app/demo/page.tsx')
    out = []
    for m in re.finditer(
        r"\{\s*title: '([^']+)',\s*tags: \[([^\]]*)\],\s*description:\s*'((?:[^'\\]|\\.)*)',\s*href: '([^']+)',"
        r"(?:\s*logo: '([^']+)',)?(?:\s*logoImg: (\w+),)?(?:\s*wordmark: '([^']+)',)?(?:\s*mark: '([^']+)',)?"
        r"(?:\s*accent: '([^']+)',)?", s, re.S):
        title, tags, desc, href, logo, logoimg, wordmark, mark, accent = m.groups()
        out.append(dict(
            title=title,
            tags=[t.strip().strip("'") for t in tags.split(',') if t.strip()],
            desc=re.sub(r"\\'", "'", desc).replace('\n', ' ').strip(),
            href=href, logo=logo, logoimg=logoimg, wordmark=wordmark, mark=mark,
            accent=accent or '#8a8a86'))
    return out

def tokens(block):
    s = read('app/globals.css')
    i = s.index(block)
    blk = s[i:s.index('\n}', i)]
    return dict(re.findall(r'(--[\w-]+):\s*([^;]+);', blk))

def brand_svg(which):
    """Circleheads / akaOSS marks, read from the site's own coordinate arrays."""
    src = read('components/ui/brand-logos.tsx')
    pre = 'CH' if which == 'circleheads' else 'OSS'
    size = float(re.search(pre + r'_S=([\d.]+)', src).group(1))
    pts = re.search(pre + r'_P:\[number,number\]\[\]=\[(.*?)\]\n', src, re.S).group(1)
    cells = re.findall(r'\[([\d.]+),([\d.]+)\]', pts)
    vb = 100 if pre == 'CH' else 32
    rects = ''.join(f'<rect x="{x}" y="{y}" width="{size}" height="{size}" fill="currentColor"/>'
                    for x, y in cells)
    return f'<svg viewBox="0 0 {vb} {vb}" xmlns="http://www.w3.org/2000/svg">{rects}</svg>'


def disc_svg(n=22):
    """A plain pixel disc — the house mark, no knockout. For the cover."""
    cells = []
    for j in range(n):
        for i in range(n):
            nx = ((i + 0.5) / n) * 2 - 1
            ny = ((j + 0.5) / n) * 2 - 1
            if nx * nx + ny * ny < 0.96:
                cells.append(f'<rect x="{i * 4.4:.2f}" y="{j * 4.4:.2f}" width="3.7" height="3.7" fill="currentColor"/>')
    return f'<svg viewBox="0 0 {n * 4.4:.1f} {n * 4.4:.1f}" xmlns="http://www.w3.org/2000/svg">{"".join(cells)}</svg>'


def logo_svg(name):
    p = os.path.join(ROOT, 'components/ui/logos', name + '.svg')
    if not os.path.exists(p):
        return None
    svg = open(p, encoding='utf-8').read()
    svg = re.sub(r'\s(width|height)="[^"]*"', '', svg, count=2)
    svg = svg.replace('<svg', '<svg preserveAspectRatio="xMidYMid meet"', 1)
    # these two kits ship fills authored for their own dark sites
    svg = svg.replace('fill="#f5f5f5"', 'fill="currentColor"')
    svg = svg.replace('fill="#eeefec"', 'fill="currentColor"')
    svg = re.sub(r'fill="rgba\(255,255,255,0\.0\d\)"', 'fill="currentColor" fill-opacity="0.12"', svg)
    return svg

def data_uri(rel, max_kb=420):
    p = os.path.join(ROOT, 'public', rel)
    if not os.path.exists(p):
        return None
    raw = open(p, 'rb').read()
    # circleheads.webp and akaoss.webp are 1-2 kB favicons, not screenshots;
    # blown up to page width they looked like a mistake, because they were one.
    if len(raw) < 12 * 1024 or len(raw) > max_kb * 1024:
        return None
    mime = mimetypes.guess_type(p)[0] or 'image/png'
    return f'data:{mime};base64,' + base64.b64encode(raw).decode()

# --------------------------------------------------------------- the document

LIGHT = tokens(':root {')
DARK = tokens('.dark {')

# The eight that carry the story, with what I actually did on each.
FEATURED = {
  'Circleheads': dict(
    role='Co-founder · product design, front end, design language',
    what='A two-person Brooklyn applied-AI studio. Agents in production, a short senior consulting bench, and original games.',
    detail='I run product and the whole front end: what gets built, how it is shaped, and the design language it ships in. Blaise runs systems, agent tooling, and the verification layers that keep outputs honest.',
    stack='Next.js · TypeScript · design system', status='Active · taking a few engagements a year',
    highlights=['Agents in production for real clients', 'A short senior consulting bench, a few engagements a year', 'Original games built in the gaps'],
    did=["Set the studio's product direction and what we take on", 'Designed and built the entire front end and the design language it ships in', 'Ran discovery with clients: watch the work first, then ship agents into it', 'Built the approval surfaces that keep a human in control of production agents']),
  'akaOSS': dict(
    role='Founder · design system, research, all front end',
    what='The open-source studio for human-in-the-loop AI: five projects, one thesis, and a reproducible research feed.',
    detail='HITL Kit, EVAL Kit, tag-kit, Collapse and Hologram, published under one design language and one argument — Assist, Not Complete. The research feed is reproducible, not a blog.',
    stack='React · shadcn registry · npm · MIT', status='Live at akaoss.dev',
    highlights=['Five projects under one design language', 'Assist-Not-Complete, argued and implemented', 'A research feed that is reproducible, not a blog'],
    did=['Wrote the Assist-Not-Complete thesis and built the primitives that implement it', 'Designed one language across five projects, published as a shadcn registry', 'Shipped six npm packages and the documentation site', 'Built the research feed so every result is reproducible from its inputs']),
  'BodyLog': dict(
    role='Product, user story, all front end, design language',
    what='An iOS app for tracking any visible body or skin condition between doctor visits.',
    detail='Acne, psoriasis, eczema, bruising, PT progress. Photos stay on device and the app never diagnoses: it records activity, never severity, and colour tells conditions apart rather than ranking them. Every glyph, badge and body figure is a character grid drawn at runtime — no image assets. Blaise built the image pipeline, SwiftData schema and migrations.',
    stack='SwiftUI · SwiftData · iOS 17+ · zero dependencies', status='Four schema versions shipped · TestFlight-bound · $3/mo or $25/yr',
    highlights=['Activity, never severity — the app makes no judgement', 'Every glyph and figure drawn at runtime, no assets', 'Photos never leave the device; no network layer exists'],
    did=['Owned the product and the user story end to end', 'Built the entire front end in SwiftUI and the design language behind it', 'Designed the pixel engine: every glyph, badge and body figure is a grid drawn at runtime', 'Set the rules the app refuses to break — activity never severity, no diagnosis, no network']),
  'Ubik Studio': dict(
    role='Co-founder · product design, front end',
    what='Three and a half years building a desktop-native AI research platform.',
    detail='Agents gathered, read and drafted; the human kept the final say at every point of judgment, with evidence behind every claim. A review queue stood between every consequential agent action and the workspace it wanted to touch — the human-in-the-loop problem before it had a name.',
    stack='Desktop · local-first · agentic research', status='2023–2026 · retired; the test log and subreddit remain public',
    shot='ubik-workspace.webp',
    did=['Co-founded and ran product design for three and a half years', 'Designed the three-pane research workspace and the evidence model behind it', 'Built the review queue that gates every consequential agent action', 'Shaped the Human Needed pattern: the agent stops, states the judgement it needs, and waits']),
  'akaVST': dict(
    role='Sole developer and designer',
    what='Three JUCE instruments for macOS, built one at a time and documented as they go.',
    detail='An acid voice with a 64-step sequencer, four lo-fi layers sharing one voice pool, and a sampler that resamples itself. Each ships with its own interface and its own documentation.',
    stack='JUCE · C++ · VST3 / AU', status='v0.4.0, v1.0.0, v0.1.0', shot='enzyme-arp.webp',
    did=['Designed and built three instruments end to end, interface and DSP', 'Wrote the 64-step sequencer and the shared voice-pool architecture', "Designed each plugin's interface and shipped its documentation with it"]),
  'akaCOVART': dict(
    role='Sole developer and designer',
    what='A generative album-art engine: shape it, sync the motion to your track, export the cover.',
    detail='Every cover is reproducible from an engine, a seed and a few parameters — the same three inputs always give the same artwork, so a cover can be regenerated at any size later.',
    stack='Canvas · deterministic PRNG · export pipeline', status='Open source',
    shot='covart-splash.webp',
    did=['Designed the engine model: engine + seed + parameters, always reproducible', 'Built the generative field engines and the motion sync to an audio track', 'Built the export pipeline so a cover can be regenerated at any size later']),
  'Hologram': dict(
    role='Sole developer and designer',
    what='Live observability and a read-only MCP surface for Blender to glTF pipelines.',
    detail='It watches an asset pipeline and streams what is happening to a local dashboard — including the tool calls an AI agent is making right now. Deliberately read-only: it observes, introspects and previews, but never modifies your assets.',
    stack='Python stdlib · MCP · JSONL event log', status='Open source, MIT',
    shot='hologram.webp',
    did=['Designed the read-only contract and held to it: observe, never modify', 'Built the MCP surface, the event log and the local dashboard', 'Wrote the Claude Code plugin so the pipeline is drivable in plain language']),
  'HITL Kit': dict(
    role='Sole designer and developer',
    what='A design system and nineteen human-in-the-loop primitives.',
    detail='Six npm packages, a shadcn registry, and a research paper arguing the thesis the primitives implement. The components are the argument made concrete.',
    stack='React · TypeScript · shadcn registry', status='Published',
    shot='hitl-kit-hero.png',
    did=['Designed nineteen human-in-the-loop primitives and the system they share', 'Built and published six npm packages and the shadcn registry', 'Wrote the research paper the components argue for']),
}

PRINCIPLES = [
  ('Assist, not complete', 'Software should hand judgment back at the moment it matters, not present a finished answer and hope. Every product here has a place where it stops and asks.'),
  ('The record, not the verdict', 'Show what happened. Do not rank it, score it, or diagnose from it. BodyLog logs activity and never severity; EVAL Kit has humans score, not models.'),
  ('Drawn, not downloaded', 'Marks, glyphs, figures and icons are character grids and geometry drawn at runtime. No icon fonts, no sprite sheets — adding an icon means adding a grid.'),
  ('Quiet by default', 'One accent, one weight range, hairline borders, no shadows doing work a border can do. Colour appears where it carries meaning and nowhere else.'),
  ('Server-rendered where it can be', 'If a thing can be static HTML, it is. Interactivity is spent on the parts that are genuinely interactive.'),
]

def clip(t, n):
    """Truncate on a word boundary — mid-word cuts read as a bug."""
    t = t.strip()
    if len(t) <= n:
        return t
    cut = t[:n].rsplit(' ', 1)[0].rstrip(' ,.;:—-')
    return cut + '…'


def esc(t):
    return (t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))

def swatches(tok, keys):
    out = []
    for k in keys:
        v = tok.get(k, '').strip()
        out.append(f'<div class="sw"><span class="chip" style="background:{v}"></span>'
                   f'<code>{k}</code><em>{esc(v)}</em></div>')
    return '\n'.join(out)

def mark_for(p):
    """The project's real logo, or a monogram when it has none that survives small."""
    if p['title'] == 'Circleheads':
        return f'<span class="stamp">{brand_svg("circleheads")}</span>'
    if p['title'] == 'akaOSS':
        return f'<span class="stamp">{brand_svg("akaoss")}</span>'
    if p['logo']:
        svg = logo_svg(p['logo'])
        if svg:
            return f'<span class="stamp">{svg}</span>'
    word = re.sub(r'^aka', '', p['title'], flags=re.I).strip() or p['title']
    return f'<span class="stamp mono-stamp">{esc(word[:2].upper())}</span>'

PROJECTS = projects()
BY_TITLE = {p['title']: p for p in PROJECTS}

pages = []

# ---- cover
pages.append(f'''
<section class="page cover">
  <div class="cover-mark">{disc_svg()}</div>
  <h1>Ieuan King</h1>
  <p class="cover-sub">Product design &middot; Technical anthropology &middot; Brooklyn</p>
  <p class="cover-line">Portfolio and design language &mdash; 2026</p>
  <p class="cover-foot">akabuild.dev &middot; ieuan@ubik.studio</p>
</section>''')

# ---- contents
toc = ''.join(f'<li><span>{i:02d}</span>{esc(t)}</li>' for i, t in enumerate(
  ['Who I am'] + list(FEATURED) + ['Also shipped', 'The design language', 'Colour', 'Type and space',
   'The card', 'The mark engine', 'Motion', 'Colophon'], start=1))
pages.append(f'''
<section class="page">
  <p class="kicker">Contents</p>
  <ol class="toc">{toc}</ol>
</section>''')

# ---- who I am
pages.append(f'''
<section class="page">
  <p class="kicker">01 &middot; Who I am</p>
  <h2>A product designer and technical anthropologist.</h2>
  <p class="lead">I work on the human side of applied AI: discovery, approval flows, and the
  interfaces that make agents legible and worth trusting. Plus the agent training, front-end and
  procedural 3D work behind them.</p>
  <p>I co-run <strong>Circleheads</strong>, a two-person Brooklyn studio shipping agents into
  production. I publish <strong>akaOSS</strong>, an open-source studio for human-in-the-loop AI with
  five projects and one thesis behind them. Before both I spent three and a half years co-founding
  <strong>Ubik Studio</strong>, a desktop research platform where agents did the gathering and
  drafting and the human kept the final say.</p>
  <p>I also produce and perform electronic music, which is where the instruments, the album-art
  engine and the live nights come from.</p>

  <p class="kicker mt">How I work</p>
  <div class="principles">
    {''.join(f'<div class="pr"><h4>{esc(t)}</h4><p>{esc(d)}</p></div>' for t, d in PRINCIPLES)}
  </div>
</section>''')

# ---- case studies
for n, (title, meta) in enumerate(FEATURED.items(), start=2):
    p = BY_TITLE.get(title, dict(tags=[], accent='#8a8a86', logo=None, title=title))
    shot = data_uri(meta['shot']) if meta.get('shot') else None
    img = f'<figure class="shot"><img src="{shot}" alt=""></figure>' if shot else ''
    if not img and meta.get('highlights'):
        img = ('<ul class="hl">' +
               ''.join(f'<li>{esc(h)}</li>' for h in meta['highlights']) + '</ul>')
    did = ''
    if meta.get('did'):
        did = ('<p class="kicker sm mt">What I did</p><ul class="did">' +
               ''.join(f'<li>{esc(d)}</li>' for d in meta['did']) + '</ul>')
    tags = ''.join(f'<span class="tag">{esc(t)}</span>' for t in p.get('tags', []))
    pages.append(f'''
<section class="page">
  <p class="kicker">{n:02d} &middot; Selected work</p>
  <div class="head">
    {mark_for(p)}
    <div>
      <h2>{esc(title)}</h2>
      <p class="role">{esc(meta['role'])}</p>
    </div>
  </div>
  <p class="lead">{esc(meta['what'])}</p>
  <p>{esc(meta['detail'])}</p>
  {img}
  {did}
  <div class="meta">
    <div><span>Stack</span>{esc(meta['stack'])}</div>
    <div><span>Status</span>{esc(meta['status'])}</div>
  </div>
  <div class="tags">{tags}</div>
</section>''')

# ---- also shipped
rest = [p for p in PROJECTS if p['title'] not in FEATURED]
cards = ''.join(f'''<div class="mini">{mark_for(p)}
  <div><h4>{esc(p["title"])}</h4><p>{esc(clip(p["desc"], 138))}</p>
  <div class="tags">{''.join(f'<span class="tag">{esc(t)}</span>' for t in p["tags"][:3])}</div></div></div>''' for p in rest)
pages.append(f'''
<section class="page">
  <p class="kicker">10 &middot; Also shipped</p>
  <h2>The rest of the shelf.</h2>
  <p class="lead">Toolkits, demos and side-quests. Every one is written up in full at
  akabuild.dev/demo.</p>
  <div class="minis">{cards}</div>
</section>''')

# ---- design language intro
pages.append(f'''
<section class="page">
  <p class="kicker">11 &middot; The design language</p>
  <h2>akaSTYLE</h2>
  <p class="lead">One language across the site, the kits and the products. It is small on purpose:
  four surfaces, one accent, three weights, and a mark engine that draws everything else.</p>
  <p>The rules below are the ones that survived contact with real pages. Several of them exist
  because the alternative was tried first and failed &mdash; those are noted, because a design system
  that only records its conclusions teaches nothing.</p>
  <div class="principles">
    <div class="pr"><h4>Two themes, one structure</h4><p>Light and dark are not variants of each
      other; each has its own surface ladder. Every surface token is achromatic &mdash; the dark theme
      carried a warm olive cast for a long time and it made the whole site feel slightly dirty.</p></div>
    <div class="pr"><h4>Cards sit above the page</h4><p>The page is the darkest thing in dark mode
      and the lightest in light mode; cards are one step toward the middle. When cards were <em>darker</em>
      than the page they had no edge to read against and the grid went flat.</p></div>
    <div class="pr"><h4>Hue is a whisper</h4><p>A project's colour appears at 7% behind its mark and
      nowhere else. Full-strength brand colour on a portfolio grid reads as a toy.</p></div>
  </div>
</section>''')

# ---- colour
pages.append(f'''
<section class="page">
  <p class="kicker">12 &middot; Colour</p>
  <h2>Four surfaces, one accent.</h2>
  <p class="lead">Everything is oklch. Surfaces carry no chroma at all; the only colour in the
  interface is the accent and the per-project whisper on a stamp.</p>
  <div class="cols">
    <div>
      <p class="kicker sm">Light</p>
      {swatches(LIGHT, ['--background','--surface','--surface-hover','--surface-border','--stamp-ground','--foreground','--muted-foreground','--select'])}
    </div>
    <div>
      <p class="kicker sm">Dark</p>
      {swatches(DARK, ['--background','--surface','--surface-hover','--surface-border','--stamp-ground','--foreground','--muted-foreground','--select'])}
    </div>
  </div>
  <div class="note"><strong>One accent token.</strong> <code>--select</code> drives the active tab,
  text selection and the focus ring &mdash; blue on light, green on dark. Nothing else in the interface
  is allowed to be the accent.</div>
  <div class="note warn"><strong>Mix in srgb, not oklch.</strong> <code>--card</code> is achromatic
  but written with an explicit hue of 0, so <code>color-mix(in oklch, …)</code> interpolates every
  accent's hue toward red. A green, a blue and a violet all came out pink. Surface mixes use srgb.</div>
</section>''')

# ---- type + space
pages.append(f'''
<section class="page">
  <p class="kicker">13 &middot; Type and space</p>
  <h2>Three weights, one family.</h2>
  <p class="lead">Inter throughout, at 200/300/500. Nothing is bold. Headings are sentence case and
  often lowercase; the interface never shouts.</p>
  <div class="scale">
    <div><span>Hero</span><p style="font-size:26px;font-weight:300;letter-spacing:-.02em">I build tools and create art.</p></div>
    <div><span>Section h2</span><p style="font-size:14px;font-weight:500;letter-spacing:.01em">Why it exists</p></div>
    <div><span>Card title</span><p style="font-size:14px;font-weight:300;letter-spacing:-.01em">Circleheads</p></div>
    <div><span>Body</span><p style="font-size:12px;font-weight:300;line-height:1.5">An iOS app for tracking any visible body or skin condition between doctor visits.</p></div>
    <div><span>Kicker</span><p style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.18em">Projects</p></div>
    <div><span>Tag</span><p style="font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.1em">Open source</p></div>
  </div>
  <div class="note"><strong>Container.</strong> Content is capped at 1180px with a responsive inset
  (20&ndash;64px). Long-form pages narrow to 672px. The demo rail is positioned inside the same
  container as the header, so its left edge lands on the wordmark's line at every width.</div>
</section>''')

# ---- the card
c1 = BY_TITLE.get('BodyLog'); c2 = BY_TITLE.get('Hologram')
def demo_card(p):
    tags = ''.join(f'<span class="tag">{esc(t)}</span>' for t in p['tags'])
    return f'''<div class="dcard">{mark_for(p)}
      <div class="dbody"><h4>{esc(p['title'])}</h4><p>{esc(clip(p['desc'], 118))}</p>
      <div class="tags">{tags}</div></div></div>'''
pages.append(f'''
<section class="page">
  <p class="kicker">14 &middot; The card</p>
  <h2>One shape for everything.</h2>
  <p class="lead">Mark stamped top-left; title, description and up to four tags stacked to its
  right. The landing grid, the project index and the link tabs all use it, so a wall of projects
  and a wall of links read as one system.</p>
  <div class="dcards">{demo_card(c1)}{demo_card(c2)}</div>
  <div class="note"><strong>The stamp</strong> is 44px, rounded 10px, bordered, with the project's
  hue at 7% behind the mark. Bitmap logos and screenshots fill it edge to edge on a dark ground &mdash;
  Box Populi's mark is white on transparent and disappears on a light one. Wordmarks too wide to
  survive 44px (Trickle at 6.8:1) fall back to a two-letter monogram.</div>
  <div class="note warn"><strong>What this replaced.</strong> The card used to carry a generated
  pixel field behind the mark &mdash; a dithered gradient, seeded per project, animated on hover. It was
  removed. A texture loud enough to notice competed with the very clean logos it was meant to
  support, and no amount of tuning the motion fixed that. The page weight fell from 78&nbsp;kB to
  26&nbsp;kB gzipped when it went.</div>
</section>''')

# ---- mark engine
pages.append(f'''
<section class="page">
  <p class="kicker">15 &middot; The mark engine</p>
  <h2>Everything is a grid.</h2>
  <p class="lead">Marks, glyphs, badges and body figures are character grids or geometry sampled on
  a lattice and drawn at runtime. There are no icon assets anywhere in the system.</p>
  <div class="logos">{''.join(f'<span class="lg">{logo_svg(n) or ""}</span>' for n in
    ['akaoss-mark','hitl-kit','eval-kit','tag-kit','collapse','hologram','akaoss-icon-disc'])}</div>
  <p>The hero mark is a disc of cells with a subject knocked out of it. It dissolves and reforms,
  and each reform reveals a different discipline &mdash; AI, code, music, procedural 3D, agent tooling,
  design. The dissolve is quantized to nine frames and each cell jumps whole cells from a seeded
  hash, which is what gives it its stutter.</p>
  <div class="note"><strong>Shared geometry.</strong> The knockouts live in one module that both the
  animating canvas and the server-rendered marks import, so a shape added once appears in both.</div>
  <div class="note warn"><strong>A knockout is not a background.</strong> The same construction was
  tried behind the cards and read as a second logo competing with the real one. Silhouettes belong
  in marks; backgrounds get texture or nothing.</div>
</section>''')

# ---- motion
pages.append(f'''
<section class="page">
  <p class="kicker">16 &middot; Motion</p>
  <h2>Motion earns its place.</h2>
  <div class="rules">
    <div><h4>Transform and opacity only</h4><p>Nothing animates a property that triggers layout.
      Hover states stay on the compositor.</p></div>
    <div><h4>Gate on the pointer, not the width</h4><p>Every hover rule sits inside
      <code>(hover: hover) and (pointer: fine)</code>. On a touch screen <code>:hover</code> latches
      after a tap and never releases &mdash; a looping animation would run until the page was left.
      Tailwind's own hover utilities are gated too, via <code>hoverOnlyWhenSupported</code>.</p></div>
    <div><h4>Suppress transitions on theme change</h4><p>Every <code>transition-colors</code> animates
      when the theme class flips, so borders flash through an intermediate colour. next-themes'
      <code>disableTransitionOnChange</code> kills them for the one frame the swap takes.</p></div>
    <div><h4>Reduced motion wins everywhere</h4><p>The <code>prefers-reduced-motion</code> override is
      deliberately ungated: it applies regardless of pointer, and the canvas mark renders one
      assembled frame instead of looping.</p></div>
    <div><h4>Pause what is off screen</h4><p>The canvas mark stops on an IntersectionObserver and on
      <code>visibilitychange</code>. An animation nobody is looking at is a bug.</p></div>
  </div>
</section>''')

# ---- colophon
pages.append(f'''
<section class="page colophon">
  <p class="kicker">17 &middot; Colophon</p>
  <h2>How this document was made.</h2>
  <p class="lead">Generated from the site itself. Project copy is read from the project index,
  colour tokens from the stylesheet, and the marks are the same <code>currentColor</code> SVGs the
  site ships &mdash; so this cannot drift from what is actually live.</p>
  <p>Set in Inter. Built as paged HTML and printed to PDF.</p>
  <div class="sign">
    <p><strong>Ieuan King</strong></p>
    <p>akabuild.dev</p>
    <p>ieuan@ubik.studio</p>
    <p>linkedin.com/in/ieuan-king &middot; github.com/akaieuan</p>
  </div>
</section>''')

CSS = f'''
@page {{ size: 210mm 297mm; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  background: {LIGHT['--background'].strip()};
  color: {LIGHT['--foreground'].strip()};
  -webkit-font-smoothing: antialiased;
  font-weight: 300;
}}
.page {{
  position: relative; width: 210mm; height: 297mm; padding: 22mm 20mm 18mm;
  page-break-after: always; break-after: page; overflow: hidden;
  display: flex; flex-direction: column;
}}
.page:last-child {{ page-break-after: auto; }}
h1, h2, h4 {{ margin: 0; font-weight: 300; letter-spacing: -0.02em; }}
h2 {{ font-size: 25px; margin-bottom: 8px; }}
h4 {{ font-size: 12.5px; font-weight: 500; letter-spacing: 0; }}
p {{ margin: 0 0 9px; font-size: 11px; line-height: 1.62; color: {LIGHT['--muted-foreground'].strip()}; }}
strong {{ font-weight: 500; color: {LIGHT['--foreground'].strip()}; }}
em {{ font-style: normal; }}
code {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9.5px; }}
.kicker {{ font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.18em;
  color: {LIGHT['--muted-foreground'].strip()}; opacity: .8; margin-bottom: 14px; }}
.kicker.sm {{ margin-bottom: 8px; }}
.kicker.mt {{ margin-top: 20px; }}
.lead {{ font-size: 13px; line-height: 1.55; color: {LIGHT['--foreground'].strip()};
  font-weight: 300; margin-bottom: 12px; }}

/* cover */
.cover {{ justify-content: flex-end; background: {DARK['--background'].strip()}; color: #fff; }}
.cover h1 {{ font-size: 54px; font-weight: 200; letter-spacing: -0.035em; }}
.cover .cover-mark {{ width: 92px; height: 92px; color: #fff; margin-bottom: auto; }}
.cover .cover-mark svg {{ width: 100%; height: 100%; }}
.cover-sub {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em;
  color: rgba(255,255,255,.62); margin-top: 14px; }}
.cover-line {{ font-size: 13px; color: rgba(255,255,255,.82); margin-top: 26px; }}
.cover-foot {{ font-size: 10.5px; color: rgba(255,255,255,.45); margin: 0; }}

/* contents */
.toc {{ list-style: none; padding: 0; margin: 0; }}
.toc li {{ display: flex; gap: 14px; align-items: baseline; font-size: 13px; padding: 7px 0;
  border-bottom: 1px solid {LIGHT['--surface-border'].strip()}; }}
.toc span {{ font-size: 9.5px; letter-spacing: .1em; color: {LIGHT['--muted-foreground'].strip()};
  min-width: 20px; }}

/* case study */
.head {{ display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }}
.stamp {{ display: inline-grid; place-items: center; width: 42px; height: 42px; flex: 0 0 42px;
  border: 1px solid {LIGHT['--surface-border'].strip()}; border-radius: 10px;
  background: {LIGHT['--stamp-ground'].strip()}; overflow: hidden; }}
.stamp svg {{ width: 24px; height: 24px; }}
.mono-stamp {{ font-family: ui-monospace, Menlo, monospace; font-size: 12px; font-weight: 500; }}
.role {{ font-size: 10px; text-transform: uppercase; letter-spacing: .12em; margin: 3px 0 0;
  color: {LIGHT['--muted-foreground'].strip()}; }}
.shot {{ margin: 12px 0; border: 1px solid {LIGHT['--surface-border'].strip()};
  border-radius: 8px; overflow: hidden; background: {LIGHT['--surface'].strip()}; }}
.shot img {{ display: block; width: 100%; height: auto; max-height: 74mm; object-fit: cover;
  object-position: top; }}
.hl {{ margin: 14px 0 0; padding: 0; list-style: none; }}
.hl li {{ font-size: 11px; line-height: 1.6; color: {LIGHT['--muted-foreground'].strip()};
  padding: 7px 0 7px 15px; border-bottom: 1px solid {LIGHT['--surface-border'].strip()};
  position: relative; }}
.did {{ margin: 6px 0 0; padding: 0; list-style: none; }}
.did li {{ font-size: 10.5px; line-height: 1.55; color: {LIGHT['--muted-foreground'].strip()};
  padding: 5px 0 5px 15px; position: relative; }}
.did li::before {{ content: '—'; position: absolute; left: 0; top: 5px;
  color: {LIGHT['--muted-foreground'].strip()}; opacity: .55; }}
.hl li::before {{ content: ''; position: absolute; left: 0; top: 14px; width: 5px; height: 5px;
  border-radius: 1px; background: {LIGHT['--select'].strip()}; }}
.meta {{ margin-top: auto; display: flex; gap: 26px; border-top: 1px solid {LIGHT['--surface-border'].strip()};
  padding-top: 10px; }}
.meta div {{ font-size: 10.5px; color: {LIGHT['--foreground'].strip()}; }}
.meta span {{ display: block; font-size: 8.5px; text-transform: uppercase; letter-spacing: .14em;
  color: {LIGHT['--muted-foreground'].strip()}; margin-bottom: 3px; }}
.tags {{ display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; }}
.tag {{ font-size: 7.5px; font-weight: 500; text-transform: uppercase; letter-spacing: .1em;
  border: 1px solid {LIGHT['--surface-border'].strip()}; border-radius: 4px; padding: 2px 5px;
  color: {LIGHT['--muted-foreground'].strip()}; }}

/* principles + rules */
.principles, .rules {{ display: flex; flex-direction: column; gap: 11px; }}
.pr h4, .rules h4 {{ margin-bottom: 3px; }}
.pr p, .rules p {{ margin: 0; font-size: 10.5px; }}
.rules div {{ border-left: 2px solid {LIGHT['--surface-border'].strip()}; padding-left: 11px; }}

/* colour */
.cols {{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }}
.sw {{ display: flex; align-items: center; gap: 9px; padding: 4px 0; }}
.sw .chip {{ width: 22px; height: 22px; border-radius: 5px; flex: 0 0 22px;
  border: 1px solid {LIGHT['--surface-border'].strip()}; }}
.sw code {{ min-width: 108px; font-size: 9px; }}
.sw em {{ font-size: 8.5px; color: {LIGHT['--muted-foreground'].strip()}; }}
.note {{ margin-top: 12px; border: 1px solid {LIGHT['--surface-border'].strip()};
  border-radius: 8px; padding: 10px 12px; font-size: 10px; line-height: 1.6;
  background: {LIGHT['--surface'].strip()}; color: {LIGHT['--muted-foreground'].strip()}; }}
.note.warn {{ border-left: 2px solid {LIGHT['--select'].strip()}; }}

/* type scale */
.scale div {{ display: grid; grid-template-columns: 74px 1fr; gap: 14px; align-items: baseline;
  padding: 7px 0; border-bottom: 1px solid {LIGHT['--surface-border'].strip()}; }}
.scale span {{ font-size: 8.5px; text-transform: uppercase; letter-spacing: .13em;
  color: {LIGHT['--muted-foreground'].strip()}; }}
.scale p {{ margin: 0; color: {LIGHT['--foreground'].strip()}; }}

/* demo cards */
.dcards {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 6px 0 4px; }}
.dcard {{ display: flex; gap: 10px; padding: 11px; border-radius: 10px;
  border: 1px solid {LIGHT['--surface-border'].strip()}; background: {LIGHT['--surface'].strip()}; }}
.dcard h4 {{ font-weight: 300; font-size: 11.5px; }}
.dcard p {{ font-size: 9.5px; margin: 3px 0 0; line-height: 1.45; }}

/* minis */
.minis {{ display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }}
.mini {{ display: flex; gap: 9px; padding: 8px; border-radius: 8px;
  border: 1px solid {LIGHT['--surface-border'].strip()}; }}
.mini .stamp {{ width: 30px; height: 30px; flex: 0 0 30px; border-radius: 7px; }}
.mini .stamp svg {{ width: 17px; height: 17px; }}
.mini h4 {{ font-size: 10px; font-weight: 500; }}
.mini p {{ font-size: 8.5px; margin: 2px 0 0; line-height: 1.4; }}
.mini .tag {{ font-size: 6.5px; padding: 1px 4px; }}

/* logo strip */
.logos {{ display: flex; gap: 14px; align-items: center; margin: 4px 0 12px; flex-wrap: wrap; }}
.lg {{ display: inline-grid; place-items: center; width: 46px; height: 46px; border-radius: 10px;
  border: 1px solid {LIGHT['--surface-border'].strip()}; background: {LIGHT['--stamp-ground'].strip()}; }}
.lg svg {{ width: 26px; height: 26px; }}

/* colophon */
.colophon .sign {{ margin-top: auto; border-top: 1px solid {LIGHT['--surface-border'].strip()};
  padding-top: 12px; }}
.colophon .sign p {{ margin: 0 0 2px; font-size: 10.5px; }}
'''

html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Ieuan King — Portfolio and Design Language, 2026</title>
<style>{CSS}</style></head>
<body>{''.join(pages)}</body></html>'''

with open(OUT_HTML, 'w', encoding='utf-8') as f:
    f.write(html)
print('html:', OUT_HTML, len(html) // 1024, 'KB')
print('pages:', html.count('class="page'))
