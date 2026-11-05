---
name: Advocacy Portfolio (fictional firm)
description: "Tinta e Papel: an editorial, paper-and-ink identity for a Brazilian full-service law firm, where motion is a sheet being composed, turned and signed, not just type moving."
colors:
  paper: "#F4EFE6"
  paper-light: "#FBF8F2"
  paper-deep: "#EAE3D6"
  ink: "#14110F"
  ink-soft: "#3A342D"
  ink-mute: "#6B6155"
  ink-dim: "#B8AFA1"
  oxblood: "#7A1F2B"
  oxblood-on-ink: "#D9929B"
  rule: "#D6CDBD"
  success: "#2F5D3A"
  warning: "#7A4E00"
  error: "#B3261E"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3.25rem, 1.5rem + 7vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3.4vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.45
  article:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "2px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  24: "96px"
  32: "128px"
  48: "192px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 32px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
  button-whatsapp:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 32px"
    height: "52px"
  button-whatsapp-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 32px"
    height: "52px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
    height: "52px"
  sheet:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "48px"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-dim}"
    typography: "{typography.small}"
    padding: "96px 0 32px"
---

# Design System: Advocacy Portfolio (fictional firm)

> Status: approved direction **Tinta e Papel** (research summary in the conversation that produced this file). Concept project: the firm, people, cases and numbers are fictional and must be labeled as demo content. Copy is pt-BR; this document is English. Values here are normative; the Tailwind theme and CSS variables created in Phase 3 must mirror them one-to-one.

## Overview

**Creative North Star: "A Mesa do Redator"** (the drafter's desk)

The site behaves like a legal brief being composed on good paper: a sheet settles, a thesis is typeset, an oxblood margin rule is drawn, a photograph is developed, and the page is turned. Everything is warm paper, near-black ink and a single oxblood accent. Authority comes from restraint, scale and rhythm, not from navy blue, gold or columns.

The research showed five law firms that look institutional but static (jQuery-era pages, news carousels, cookie banners covering the first screen, no visible primary action) and Slaughter and May and Cravath as the only ones with real typographic confidence. We keep that confidence and add what none of them have: a physical, paper-based motion language that goes beyond moving type. Motion here is *material*: sheets lift, covers slide off images, ink lines draw, pages turn. Gravity beats flashiness; nothing bounces.

The audience is individuals and small businesses judging credibility in seconds on a phone. So the first screen is a clear sentence, a visible WhatsApp action and calm motion that never delays reading.

**Key Characteristics:**
- Warm paper ground, ink text, oxblood used sparingly (under 8% of any viewport).
- Large serif display, quiet sans for interface. Two families only.
- A left "margin" column for annotations, numerals and the drawn margin rule.
- Flat surfaces, hairline rules, no shadows except the lifted sheet during a page turn.
- Motion is soft, long ease-out, interruptible, and always has a static equivalent.
- One signature moment: **A Tese**.

### Signature moment: "A Tese"

The opening sheet of the home page, composed as one continuous gesture. It is the first thing built and every other effect is a quieter echo of it.

| Beat | Time | What happens | Library | Material |
|---|---|---|---|---|
| 0. Settle | 0 to 0.4s | Paper ground is already present (no blank flash). The nav and WhatsApp action fade in. | CSS | opacity |
| 1. Typeset | 0.2 to 1.3s | The thesis headline sets line by line: each line rises 105% to 0 inside a mask, stagger 90ms. | GSAP + SplitText | transform |
| 2. Rule | 0.6 to 1.5s | An oxblood hairline is drawn down the left margin; numerals 01 and 02 and a short annotation fade in beside it. | GSAP | scaleY, opacity |
| 3. Develop | 0.8 to 2.2s | A paper-colored cover slides off the hero photograph while the image settles from scale 1.15 to 1. | GSAP | transform |
| 4. Turn | on scroll | As the visitor scrolls, the hero sheet lifts and recedes (scale 0.97, opacity 0.6) while the next sheet slides up over it with the only shadow in the system. | GSAP ScrollTrigger (scrub 0.6) | transform, opacity |

Rules for the moment:
- Total intro is at most 2.4s and never blocks reading, scrolling or the CTA. Text is in the DOM and painted from first render; the animation only masks its entrance. Scrolling during the intro fast-forwards it to its end state.
- The headline is the LCP element and must not be hidden behind a loader.
- Demo thesis copy (label as demo): "Cada caso começa por escutar." Never a promise of results.
- Beat 4 is desktop and fine-pointer only; on touch the next sheet simply scrolls in (see Mobile fallback).

## Colors

A warm, low-chroma paper and ink palette with one deep red. Contrast ratios below are computed against WCAG 2.x.

### Primary
- **Oxblood Ink** (`#7A1F2B`): the only accent. Margin rule, active states, the WhatsApp button, selection and link underline on hover. 8.91:1 on Paper, 8.00:1 on Paper Deep. Used on at most 8% of any viewport.
- **Oxblood on Ink** (`#D9929B`): the only oxblood allowed on dark surfaces (footer, dark sheets), 7.64:1 on Ink. The base oxblood never sits on ink (about 1.8:1).

### Neutral
- **Paper** (`#F4EFE6`): default page background. Warm, never pure white.
- **Paper Light** (`#FBF8F2`): raised sheets, cards, the lifted page in the page turn.
- **Paper Deep** (`#EAE3D6`): recessed bands, image cover during reveals, page-transition sheet. Muted text on it is 4.75:1.
- **Ink** (`#14110F`): body and headline text (16.42:1 on Paper), primary button fill, footer ground.
- **Ink Soft** (`#3A342D`): secondary text and long reading copy (10.73:1).
- **Ink Mute** (`#6B6155`): metadata, captions, labels (5.29:1 on Paper, 4.75:1 on Paper Deep). Never below 12px.
- **Ink Dim** (`#B8AFA1`): body text on the Ink footer.
- **Rule** (`#D6CDBD`): hairlines and dividers. Decorative only, never carries text or meaning alone.

### Functional (forms are demo-only, but states must exist)
- **Success** (`#2F5D3A`, 6.67:1), **Warning** (`#7A4E00`, 6.29:1), **Error** (`#B3261E`, 5.71:1). Always paired with an icon and text, never color alone.

### Named Rules
**The One Red Rule.** Oxblood is the only accent and the only red. If two things on a screen are red, one is wrong.
**The No-Pure Rule.** No `#fff`, no `#000`, no gray without a warm tint. Everything leans toward paper or ink.
**The Dark Is a Section Rule.** There is no global dark mode in v1. Ink surfaces appear only as deliberate sections (footer, one closing CTA band) so the paper identity stays intact.

## Typography

**Display and reading font:** Newsreader (variable, with optical size axis), fallback Georgia, serif.
**Interface font:** Instrument Sans, fallback system-ui, sans-serif.

**Character:** Newsreader is a contemporary editorial serif made for long reading; at display sizes with tight tracking it reads like a quality journal masthead. Instrument Sans is a neutral, slightly condensed grotesque that stays out of the way for navigation, labels and short body copy. Two families, no third, ever. Both load through `next/font` with `display: swap`, subset to Latin (covers pt-BR diacritics), and use the variable files to keep the font payload small.

### Hierarchy
- **Display** (Newsreader 400, `clamp(3.25rem, 1.5rem + 7vw, 8rem)`, lh 0.96, tracking -0.02em, opsz auto): the hero thesis only. One per page. Max 5 lines, never centered on desktop.
- **Headline** (Newsreader 400, `clamp(2.25rem, 1.4rem + 3.4vw, 4.5rem)`, lh 1.04): section statements and page titles.
- **Title** (Newsreader 400, `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)`, lh 1.15): practice-area names, article card titles, team names.
- **Lead** (Newsreader 400, 22px / 1.375rem, lh 1.45): the one introductory paragraph under a headline. Max 55ch.
- **Article** (Newsreader 400, 20px / 1.25rem, lh 1.65, max 65ch): MDX reading text in the blog. Italic for emphasis, never bold for emphasis.
- **Body** (Instrument Sans 400, 17px / 1.0625rem, lh 1.6, max 65ch): interface copy and short paragraphs.
- **Small** (Instrument Sans 400, 14px, lh 1.5): captions, footnotes, legal text, fictional-content labels.
- **Label** (Instrument Sans 500, 12px, uppercase, tracking 0.14em): buttons, nav, tags, margin numerals. Never used for full sentences.

### Named Rules
**The One Display Rule.** Display size appears once per page. Everything else steps down at least one level.
**The Italic Voice Rule.** Newsreader italic is the only emphasis inside headlines (one phrase per headline, max). No bold in display type, no color emphasis.
**The Measure Rule.** Reading text never exceeds 75 characters per line and never falls below 16px on mobile.

## Layout

A 12-column grid on desktop with a dedicated **margin column**, collapsing to 8 columns on tablet and 4 on mobile.

- **Container:** max content width 1280px, side gutters `clamp(20px, 5vw, 72px)`. Full-bleed is allowed for photographs only.
- **Grid:** 12 columns, 24px gap desktop (1024px and up); 8 columns, 20px gap tablet (640 to 1023px); 4 columns, 16px gap mobile (360 to 639px).
- **Margin column:** at 1024px and up, columns 1 to 2 are the margin: section numerals (01, 02), the drawn oxblood rule, marginal notes. Content lives in columns 3 to 12. On tablet and mobile the margin collapses to an inline numeral above the section.
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Components use 4 to 32; sections use 64 to 192.
- **Section rhythm:** vertical padding `clamp(96px, 14vw, 192px)` for major sections, `clamp(64px, 8vw, 128px)` for minor. Generous whitespace is the premium signal.
- **Asymmetry over symmetry:** headlines sit in the left of the content area and body copy is offset right; never three equal cards in a row. Practice areas are an index list, team is an uneven editorial grid.
- **Breakpoints:** 360 (design floor), 640, 1024, 1440, up to 1920 (content stops growing at 1280, margins absorb the rest).
- **CTA placement:** primary WhatsApp action visible in the first viewport (hero), in the nav at 1024px and up, and as a persistent bottom bar on mobile (see Components). Secondary scheduling CTA sits in the closing band and on Contato.
- **Trust signals (no invented facts):** named team with labeled fictional OAB numbers, practice areas, editorial articles with reading time, clear process steps, privacy/LGPD link, and the visible note "Projeto conceito, escritório fictício". No testimonials, no case results, no rankings.

### Responsive rules
- Mobile is its own design, not a shrunk desktop: single column, display type reduced by the clamp, margin numerals inline, one persistent WhatsApp bar.
- Touch targets are at least 44x44px with 8px spacing.
- Nothing depends on hover. Hover reveals are duplicated as always-visible or tap states on touch.
- Test at 360, 390, 768, 1024, 1440 and 1920 plus 200% browser zoom.

## Elevation & Depth

Flat by default. Depth is tonal (Paper, Paper Light, Paper Deep) and structural (hairline rules), not shadowed. The only shadow in the system belongs to a sheet in motion.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 1px 0 rgba(20,17,15,0.06), 0 24px 48px -24px rgba(20,17,15,0.28)`): applied to a sheet only while it is lifted during the page turn and page transition, then removed. Never on resting cards, buttons or images.

### Named Rules
**The Paper Does Not Float Rule.** Resting elements have no shadow. If it needs separation, use a hairline rule or a tonal step.
**The Grain Rule.** A static, very low-opacity paper grain (max 4%, a tiled PNG or SVG filter-free texture under 12KB) may sit on the Paper ground. Never animated, never on text blocks, removed in reduced-data contexts.

## Shapes

Square, like paper. Corners are 0px by default, 2px for form fields only to avoid a harsh pixel edge. Only circles are round: the oxblood seal (decorative stamp) and the cursor follower.

- **Rules:** 1px hairlines in Rule color divide sections, index rows and form fields. A 2px Ink or Oxblood rule marks emphasis.
- **Images:** rectangular, fixed aspect ratios (4:5 portrait, 3:2 and 16:9 landscape, 1:1 detail). No rounded photos, no blobs, no masks beyond the paper-cover reveal.
- **Seal:** one 96px circular oxblood seal (SVG, fictional firm mark placeholder) used as a signature at the end of the hero sheet and closing band. Never an emblem of scales or columns.

## Components

### Buttons
Rectangular, 52px tall, label type (12px caps, tracking 0.14em), padding 18px 32px, 0 radius.
- **Primary (Ink):** Ink fill, Paper text. Hover: Oxblood fill slides up from the bottom edge (a transform-only pseudo layer, 240ms ease-out). Active: scale 0.97 in 120ms. Focus: 2px Oxblood ring with 3px Paper offset.
- **WhatsApp (Oxblood):** the primary conversion action. Oxblood fill, Paper text, WhatsApp glyph at 18px. Hover: fill shifts to Ink. Magnetic on fine pointers only (see Motion). Persistent on mobile as a bottom bar, 56px tall, safe-area padded, hidden while the keyboard is open.
- **Secondary:** transparent, 1px Ink border, Ink text. Hover: Ink fill sweeps in, text flips to Paper.
- **Quiet (text link with arrow):** label type, underline hairline that draws left to right on hover (240ms). Used for "Ler artigo", "Ver área".
- **Disabled:** Ink Mute text on Paper Deep, no hover, no motion.

### Navigation
- Wordmark (Newsreader, fictional firm name placeholder) left; links in label type right; WhatsApp button last at 1024px and up. Fixed, transparent over hero, becomes Paper with a bottom hairline after 80px scroll (opacity transition, 200ms). Hides on scroll down and returns on scroll up (240ms translateY), disabled for keyboard focus.
- Mobile: wordmark and a "Menu" label button. The menu opens as a full-height Paper sheet sliding from the top (320ms ease-in-out in, 220ms out), links set in Title size with 70ms stagger, trapped focus, closes on Escape.
- Active page: Oxblood underline 2px, offset 6px.

### Practice Areas Index
The signature list of the site. Each row: numeral (label), area name (Title or Headline size), one-line summary, arrow. Rows are separated by hairlines. On hover (fine pointer) the row's photograph appears in a fixed-position preview that follows the cursor with spring smoothing; on touch each row expands inline to show the photo and summary on tap (height via grid-template-rows transition 320ms). Keyboard focus shows the same preview statically.

### Sheets (cards and containers)
- Paper Light, 0 radius, no shadow, 1px Rule border only when it sits on Paper. Padding 32px mobile, 48px desktop.
- **Team card:** 4:5 portrait, name in Title, role and fictional OAB number in Small, label "Retrato fictício" in Small Mute. Uneven editorial grid (one tall, one short in alternation).
- **Article card:** 3:2 image, tag in Label, title in Title, reading time in Small. No author avatar clutter.

### Inputs and Fields (demo only)
- Underline fields: transparent ground, 1px Ink Mute bottom rule, Body type, 52px tall. Floating label in Label type that moves up 8px and shrinks over 160ms. Focus: bottom rule becomes 2px Oxblood. Error: Error color message with icon, never color alone. Placeholder never replaces label.

### Footer
Ink ground, Ink Dim text, Oxblood-on-Ink for links on hover. Contains wordmark, areas, contact, social, privacy and cookies links, and the required line: "Projeto conceito: escritório e conteúdo fictícios." Also the OAB-safe disclaimer: informational content, not legal advice.

### Marginalia (signature component)
Numerals (01 to 06), thin oxblood vertical rule that draws as the page scrolls (scaleY scrubbed to scroll progress), and short Small-size notes in the margin column. Decorative, `aria-hidden`, absent on mobile except the inline numeral.

## Do's and Don'ts

### Do
- **Do** let whitespace and scale carry authority: one big idea per screen.
- **Do** keep Oxblood under 8% of the viewport and use it for action and the margin rule.
- **Do** make every motion expressible as paper behavior: a sheet lifts, a cover slides, ink is drawn, a page turns.
- **Do** keep the WhatsApp action visible without scrolling on every page and every viewport.
- **Do** label all fictional people, numbers and content visibly (Small type, Ink Mute).
- **Do** write OAB-safe copy: informational tone, no guarantees, no solicitation, no "best", no price bait.
- **Do** keep photography in one warm grade (see Imagery).

### Don't
- **Don't** use navy plus gold, columns, scales of justice, gavels, handshakes or skyscraper stock. Those are the generic law-firm reflex.
- **Don't** center body copy, use three identical feature cards, or put an icon above every heading.
- **Don't** use gradients, glassmorphism, neon, glows or drop shadows on resting UI.
- **Don't** use a second accent color, a third typeface, bold display type, or gradient or colored headline text.
- **Don't** animate letter by letter on paragraphs, bounce, overshoot, spin, or slide things in from off-screen edges at speed.
- **Don't** hide content behind a loader or require animation to read the page.
- **Don't** invent testimonials, results, awards, client names or statistics.

## Imagery

- **Subjects:** hands on documents, paper edges, fountain pen and ink, archive shelving, window light across a desk, architectural detail (stone, wood, stairwell), neutral-backdrop portraits. No eye-contact-with-camera handshake poses, no gavels, no courtroom clichés.
- **One grade:** warm, slightly desaturated, shadows lifted to roughly `#1B1713`, highlights pulled toward `#F4EFE6`, subtle grain. Apply the same grade to every photo (batch-processed, committed in optimized form only). Mixed grades are a defect.
- **Portraits:** 4:5, one lighting setup, neutral warm backdrop, labeled "Retrato fictício". Generated or licensed stock must be disclosed as such in the repo notes.
- **Format:** AVIF with WebP fallback via `next/image`, explicit width and height, `sizes` set, hero at most 180KB, others at most 120KB. Meaningful pt-BR alt text; decorative images use empty alt.
- **Icons:** one set only: Lucide at 1.5px stroke, 20px. Allowed: arrow-up-right, arrow-right, menu, x, plus, minus, check, alert-circle. Plus the WhatsApp brand glyph. No emoji, no decorative icons above headings.
- **Hero video:** none in v1. If added later: a muted loop under 5MB with a poster and a visible pause control.

## Motion System

Motion is soft and material. The firm's voice is calm, so even the boldest effects use long ease-out curves, short staggers and never bounce. Rule of thumb from emil-design-eng: UI feedback is fast (under 300ms); scenes and reveals can be slower because they are rare and deliberate; exits are faster than entrances.

### Libraries and ownership
- **GSAP 3 (`gsap`, `@gsap/react`)** with **ScrollTrigger** and **SplitText**: all scripted and scroll-linked motion. Use `useGSAP` with a scope so cleanup is automatic. Register plugins once in a provider.
- **Lenis:** one instance, synced with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` and the GSAP ticker driving `lenis.raf`, with `gsap.ticker.lagSmoothing(0)`). Created only on fine-pointer, non-reduced-motion contexts.
- **CSS transitions:** hover, press, focus, nav state, field labels. Use transitions (interruptible), not keyframes, for anything the user can trigger rapidly. Gate hover with `@media (hover: hover) and (pointer: fine)`.
- **`gsap.matchMedia()`:** the single place where tiers are decided (Full, Lite, Reduced).
- **Never** animate `width`, `height`, `top`, `left`, `margin`, `padding` or `box-shadow`. Animate `transform` and `opacity` only. Exceptions: the stroke offset of one SVG path, and grid-row expansion for the accordion row (a single, contained element).
- **No WebGL, no Three.js, no canvas** in v1. The research showed WebGL studio sites still loading at about a third after 12 seconds; that is the opposite of this brand.

### Tokens

```css
/* Durations */
--dur-instant: 100ms;  /* press feedback */
--dur-fast:    160ms;  /* hover, color, labels */
--dur-base:    240ms;  /* links, buttons, nav state */
--dur-slow:    480ms;  /* menus, sheets, page-transition lift */
--dur-reveal:  900ms;  /* text and image reveals */
--dur-scene:  1200ms;  /* hero image develop, cover slides */

/* Easings (custom; never the built-in keywords) */
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);    /* entering, revealing, hover */
--ease-inout:  cubic-bezier(0.77, 0, 0.175, 1);   /* on-screen movement, sheet covering */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* menus, accordions, page turn */
/* GSAP equivalents: CustomEase or "expo.out" for --ease-out, "power3.inOut" for --ease-inout */

/* Stagger */
--stagger-lines: 90ms;   /* text lines, max 6 lines */
--stagger-words: 30ms;   /* short headings only, max 12 words */
--stagger-items: 70ms;   /* list rows, cards, menu links */
--stagger-max:  600ms;   /* total stagger budget; reduce the step to fit */

/* Distances and scale */
--shift-text:   105%;    /* line mask rise */
--shift-fade:    16px;   /* paragraph and block rise */
--press-scale:  0.97;
--parallax-max:  8%;     /* desktop image travel */
```

**Global rules:** nothing animates from `scale(0)` (start at 0.95 or higher with opacity); reveals fire once (`once: true`); all tweens are killed and reverted on cleanup and on breakpoint change; no animation on keyboard-initiated actions or focus; never block interaction while a stagger plays; enter and exit are asymmetric (exit is about 60% of enter duration).

### Effects

| Effect | Library | Behavior and soft-feel rule |
|---|---|---|
| **Loading animation** | CSS only (inline, zero JS dependency) | First visit per session only (`sessionStorage` flag), skipped on repeat. A Paper veil with the wordmark and an oxblood hairline drawing left to right (600ms, `--ease-out`), then the veil lifts with translateY to -100% (500ms, `--ease-drawer`). Hard cap 1.2s. Page content (including the LCP headline) is already in the DOM beneath it; the veil is `aria-hidden` and `pointer-events: none`. It waits for fonts with an 800ms timeout, never for images or JS. |
| **Hero intro ("A Tese")** | GSAP timeline + SplitText | The five-beat sequence in the Overview. Lines rise inside a mask 900ms `--ease-out`, stagger 90ms; margin rule draws 900ms; image cover and settle 1200ms `--ease-drawer`. Total at most 2.4s. Scroll fast-forwards it. Fires after the veil lifts (or immediately on repeat visits). |
| **Scroll storytelling** | GSAP ScrollTrigger + Lenis | The home reads as stacked sheets ("o dossiê"): each section is a sheet that slides over the previous one, which recedes (scale 0.97, opacity 0.6) with `scrub: 0.6` so motion trails the scroll softly. Max 5 stacked sheets on the home. Section order and copy stay readable with all motion off. |
| **Pinned sections** | GSAP ScrollTrigger `pin` | One pinned scene on the home: Practice Areas. The index stays pinned while area photographs cross-fade (opacity, 480ms) and the oxblood numeral advances. `scrub: 0.6`, `anticipatePin: 1`. Total pinned distance across the whole page capped at about 4 viewport heights so the visitor never feels trapped. The page must never require the pin to understand the content. |
| **Text reveals** | GSAP SplitText + ScrollTrigger | Headlines: line mask rise (105% to 0), 900ms `--ease-out`, stagger 90ms, `start: "top 85%"`, once. Short headings may use word stagger (30ms). Paragraphs and Lead: whole-block fade plus 16px rise, 600ms. Never character-by-character on paragraphs. Revert SplitText on resize and on cleanup. |
| **Image reveals** | GSAP ScrollTrigger | The "paper cover": a Paper Deep layer over the image slides off (`scaleY` 1 to 0, origin top, 1200ms `--ease-drawer`) while the image inside settles from scale 1.15 to 1. Transform only; no `clip-path` animation. Max 2 images revealing at once. |
| **Parallax** | GSAP ScrollTrigger `scrub: 1` | Photographs travel within their frame at up to 8% (`--parallax-max`), only on images taller than 40vh. The frame overscans the image by the travel distance so no gap shows. Also: the drawn oxblood margin rule scrubs `scaleY` with page progress. |
| **Magnetic buttons** | GSAP `quickTo` | Fine pointers only, and only on the WhatsApp and nav CTA buttons. Pull strength 0.25 inside an 80px field, `quickTo` duration 0.6 `power3.out`, springs back on leave. Disabled while the button is focused by keyboard. |
| **Custom cursor** | GSAP `quickTo` (fine pointer only) | A 10px Ink dot with a 40px ring follower (`quickTo` 0.35). The native cursor stays visible. The ring grows to 56px with a Label ("Ver", "Ler") over images and index rows (200ms `--ease-out`). Hidden on touch, in reduced motion and over form fields. Never `mix-blend-mode` heavy. |
| **Hover and press** | CSS transitions | Buttons: fill sweep 240ms `--ease-out`; press scale 0.97 in 120ms. Links: underline draws 240ms. Cards and rows: image scale 1.03 over 600ms, caption nudge 4px. Index preview follows the cursor with spring smoothing. All behind `(hover: hover) and (pointer: fine)`; touch gets the press state only. |
| **Page transitions** | GSAP, shell around App Router | A Paper Deep sheet covers the route (translateY 100% to 0, 320ms `--ease-inout`), the route swaps, then the sheet lifts away (translateY 0 to -100%, 480ms `--ease-drawer`), with the Sheet lift shadow only while moving. The destination hero then runs its short intro. Total at most 800ms, interruptible (a new click retargets the sheet from its current position), never runs on first load, back/forward, hash links or same-page navigation. Because App Router has no exit hook, link clicks are intercepted by the shell and call `router.push` after the cover completes. |

### Reduced-motion fallback (`prefers-reduced-motion: reduce`)
Reduced means fewer and gentler, not nothing:
- Lenis is not created (native scroll). No pinning, no scrub, no parallax, no sheet stacking transform, no magnetic buttons, no cursor follower, no loader (veil skipped entirely).
- Text, image and block reveals become a 200ms opacity fade (or static). Image covers are not rendered.
- The margin rule is drawn in its final state.
- Page transitions become an instant swap with a 150ms opacity crossfade.
- Hover keeps color changes (160ms); transform-based hover is removed.
- Content, order and layout are identical to the animated version. Verify with the OS setting on and with `matchMedia` toggled live.

### Mobile and low-end fallback (Lite tier)
Applies on `(max-width: 1023px)`, coarse pointers, or low-end devices (`navigator.hardwareConcurrency <= 4` or `deviceMemory <= 4`):
- No Lenis (native momentum scrolling), no pinning (Practice Areas becomes a normal stacked index with tap-to-expand rows), no magnetic effect, no cursor, no hover previews.
- Sheet stacking becomes ordinary scrolling; the page turn is dropped.
- Text reveals stay (one-time, 600ms) because they are cheap; image covers use a simple 600ms fade-and-rise; parallax off or at most 4%.
- Stagger step shortened by one third; at most 6 tweens active at once.
- Intro cut to under 1.6s. The loader is shortened to the veil lift only.
- Page transitions use a 200ms cover and 300ms lift.

### Performance budget

| Item | Budget |
|---|---|
| Motion JS (GSAP core, ScrollTrigger, SplitText, Lenis, shell) | at most 70KB gzip, loaded with dynamic import after first paint, never in the critical path |
| LCP / CLS / INP (mobile, throttled) | under 2.5s / under 0.1 / under 200ms |
| Frame rate | 60fps on desktop, no long tasks above 50ms during scroll; verified at 4x CPU throttle |
| Loader | CSS only, at most 1.2s, zero blocking requests |
| Hero intro | at most 2.4s, text visible from first paint, transforms only |
| Image reveal | at most 2 simultaneous, `will-change: transform` set only while running, removed after |
| Parallax | at most 4 parallax images in a viewport, none below 40vh in height |
| Pinned scene | 1 on the home, at most 4 viewport heights of pin in total, never on inner pages without approval |
| Text reveals | one SplitText per heading, reverted when done; no per-character DOM on paragraphs |
| Cursor and magnetic | 1 `quickTo` setter per axis, updated only on `pointermove`, off on touch |
| Page transition | at most 800ms total, a single fixed element, transforms only |
| Fonts | 2 families, variable files, subset Latin, `display: swap`, preloaded for the LCP weight only |
| Images | AVIF/WebP, hero at most 180KB, others at most 120KB, explicit dimensions |

## Accessibility

- WCAG 2.2 AA minimum; all text pairs in the Colors section were computed at 4.5:1 or higher (large text 3:1). Lighthouse mobile accessibility target is 95 or higher.
- `lang="pt-BR"`, skip link first in tab order, one `h1` per page, logical heading order, landmarks for nav, main and footer.
- Visible focus on every interactive element: 2px Oxblood ring, 3px offset, never removed. No animation on focus.
- Touch targets at least 44x44px. Text scales to 200% without loss; layouts use rem and clamp.
- Motion: honors `prefers-reduced-motion` (see fallback); no autoplaying content longer than 5 seconds without a pause control; no flashing; the loader and intro never gate content or focus.
- Hover-only information is always available on focus and touch.
- SplitText must preserve the accessible name: keep the original text in an `aria-label` or visually-hidden copy and mark split spans `aria-hidden`.
- Decorative elements (margin rule, seal, grain, cursor) are `aria-hidden`.
- Forms (demo): labels always visible, errors announced via `aria-live`, never color alone.
- Copy: no promise of results, no solicitation tone (OAB advertising rules); informational disclaimer in the footer and on articles.

## Never Do (what would make this look generic or cheap)

1. Navy and gold, columns, scales, gavels, handshakes, skyscraper or "lawyer pointing at laptop" stock.
2. A news carousel as the hero, or a hero with no sentence and no action.
3. Centered everything, three equal feature cards, icons above headings, emoji.
4. Purple or blue gradients, glassmorphism, glows, neon, drop shadows on resting UI.
5. A third typeface, bold display type, colored or gradient text, ALL CAPS paragraphs.
6. A loader that blocks the page, runs every visit or waits for images; a progress percentage; any WebGL or 3D intro.
7. Bounce, overshoot, spin, parallax on every element, scroll-jacking that fights the user, horizontal scroll hijack on mobile.
8. Letter-by-letter animation on body copy; text that is invisible until JavaScript runs.
9. `transition: all`, ease-in on UI, durations above 300ms for feedback, animating layout properties.
10. A custom cursor that hides the native one, or any cursor effect on touch.
11. Mixed photo grades, visible stock-photo smiles, uncredited or unlabeled AI portraits.
12. Fake testimonials, case results, awards, client logos, statistics or "melhor escritório" claims; any copy that promises outcomes or solicits clients.
13. A cookie banner covering the hero on mobile for a site that runs no tracking (v1 has no analytics, so no banner is needed).
14. Dark mode as a toggle in v1, or a second accent color.
15. Page transitions that run on first load, back/forward, or that cannot be interrupted.
