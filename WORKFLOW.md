# WORKFLOW — Law Firm Portfolio Site (design + motion first)

Goal: a cinematic, soft-feeling, award-level portfolio piece that looks and behaves like a real
Brazilian full-service law firm website. Fictional firm, pt-BR, frontend only. No database, no
checkout, no SEO work, no analytics. Static typed data + MDX. Deployed free.

Priorities, in order: 1) design taste, 2) motion feel, 3) smooth performance, 4) accessibility.

How to use this file:
- Go phase by phase. Never skip a GATE (you approve before moving on).
- Start a **new Claude chat at every phase boundary** (`NEW CHAT`). Every prompt re-reads
  CLAUDE.md / BRIEF.md / DESIGN.md, so nothing is lost.
- Copy the prompts in the `text` blocks as-is. Replace anything in `<angle brackets>`.
- Claude never pushes, never commits secrets, never invents facts outside BRIEF.md.

Status in this repo: **Phase 1 is DONE** (commit `f67c992`). Continue at Phase 2.

## The quality system (why this ends up the best it can be)

Nobody can guarantee taste, so this workflow makes it hard to ship anything mediocre:

1. **Research before design.** Real references are studied and approved before any style is chosen.
2. **One signature moment.** DESIGN.md must name a single hero-level interaction everything else supports.
3. **Look at it, don't just code it.** After every section, Claude screenshots desktop and mobile
   (browser tool) and critiques its own work against DESIGN.md before committing.
4. **Dedicated passes** with the right skill: `impeccable` (critique, polish, bolder/quieter,
   animate), `emil-design-eng` (motion and feel), `gsap-scrolltrigger` (scroll craft).
5. **Soft-feel rules** are written into DESIGN.md and audited: easing curves, durations, stagger
   rhythm, interruptible animations, no abrupt state changes, generous whitespace.
6. **Reference diff** at the end: the finished site is compared to the approved references.
7. **Your eyes are the final gate.** You review on a real phone and desktop at each GATE.

---

## PHASE 0 — Preparation (you, before opening Claude)

### 0.1 Move the project out of OneDrive (important on Windows)
OneDrive syncing `node_modules/` and `.next/` causes slowness, file locks and random build errors.
The accented `Portfólio` in the path can also break tools.

```powershell
mkdir C:\dev\advocacy
```

Move the project (including `.git`) there and open Claude from that folder.

### 0.2 Software and accounts
Node.js LTS, npm, Git, GitHub CLI, VS Code, Chrome (installed). GitHub + Vercel Hobby (free) or
Cloudflare Pages for deploy. No domain needed.

### 0.3 Tooling in your Claude
Skills: `impeccable`, `emil-design-eng`, `gsap-core`, `gsap-scrolltrigger`, `web-design-guidelines`,
`website-design:design-system`, `website-design:landing-page`, `website-design:review-page`.
Built-in Browser for research and visual checks. Supabase/Cloudflare MCPs are not used.

### 0.4 Assets (they decide how premium it looks)
- 3-5 inspiration links you personally love (any industry). Paste them in Phase 2.
- Photography: team portraits (one consistent style), office interiors, architecture, abstract
  textures (marble, paper, light). Free sources (Unsplash/Pexels, check license), your own shots
  or AI-generated, all with ONE consistent color grade. Label portraits as fictional.
- Optional: one short compressed hero video (loop, < 5 MB) with a poster.
- Keep originals in `raw-assets/` (git-ignored). Commit optimized files only.

---

## PHASE 1 — Setup, interview, stack, CLAUDE.md, BRIEF.md  (DONE here)

Re-run only in a brand-new project.

```powershell
cd C:\dev\advocacy
git init
@'
.env*
!.env.example
node_modules/
.next/
out/
dist/
.vercel/
*.log
.DS_Store
Thumbs.db
raw-assets/
coverage/
playwright-report/
test-results/
'@ | Set-Content .gitignore
```

```text
/impeccable init
```

```text
Interview me using AskUserQuestion (max 6 questions). This is a FICTIONAL full-service Brazilian
law firm website for my developer portfolio: pt-BR, frontend only, no database, no checkout, no
SEO work, static data + MDX, deployed free. Skip anything already answered. Cover firm name and
positioning, practice areas, pages, blog, CTAs (WhatsApp, social, scheduling embed), wow features,
brand direction and sites I admire, hosting. Propose fictional brand facts yourself and label them.

Choose and explain the stack. Default: Next.js (App Router, static export) + TypeScript +
Tailwind + MDX + GSAP (ScrollTrigger, SplitText, Flip) + Lenis, hosted on Vercel.

Create CLAUDE.md (under 20 lines) and BRIEF.md. CLAUDE.md must require: approved stack; commit each
verified step; never push or commit secrets; .env* in .gitignore first; emil-design-eng for motion;
Impeccable for audits; demo-only forms; GSAP via useGSAP with cleanup, transform/opacity only,
prefers-reduced-motion respected, lighter mobile variants, one Lenis synced with ScrollTrigger;
smooth-performance budget (LCP < 2.5s, CLS < 0.1, INP < 200ms); footer note "Concept project,
fictional firm"; no invented testimonials/results; OAB-safe copy; test before commit; approval
before deploy.

Do not write application code. Verify .gitignore, review both files, commit, and stop.
```

**GATE:** read CLAUDE.md and BRIEF.md and fix anything wrong.

---

## PHASE 2 — Research and design system  `NEW CHAT`   (the most important phase)

```text
/website-design:design-system

Read CLAUDE.md and BRIEF.md. My inspiration links: <paste 3-5 links, or "none">.

STEP A — Research (no files yet). Using the browser on desktop and mobile, scroll through:
- 4-5 top law firm sites (Brazilian and international; prestigious, editorial, modern).
- 2 best-in-class sites from other industries for taste (luxury, architecture, publishing, fashion).
- 3 award-level MOTION references (Awwwards / Site of the Day style).
For each: layout, hero, typography, color, spacing, CTA placement, trust signals, and what makes it
feel premium. For motion references: what each animation does, its easing/duration feel, and how
it is likely built (GSAP, Lenis, CSS, WebGL).
Then list what they do poorly and what we can do better.

STEP B — Show me 3 distinct design directions (name, palette, type pairing, mood, signature
moment, motion personality) with the evidence from the research. WAIT for me to pick one.

STEP C — Only after approval, use Impeccable to write DESIGN.md: visual direction, colors with
roles, typography (two fonts max, scale, pairing), spacing, layout grid, components, responsive
rules, accessibility, imagery rules, and:
- ONE named signature moment.
- Motion system with emil-design-eng: tokens (durations, easings, stagger), and for each effect
  the library and the soft-feel rule: loading animation, hero intro, scroll storytelling, pinned
  sections, text reveals, image reveals, parallax, magnetic buttons and cursor (fine pointers
  only), hover/press states, page transitions.
- Reduced-motion fallback, mobile fallback, performance budget per effect.
- A "never do" list (what would make this look generic or cheap).
No application code. Commit the verified result.
```

**GATE 2a:** pick the direction (Claude waits).
**GATE 2b:** read DESIGN.md. It must feel specific to this firm. If it could fit any firm, say so
and ask for a rewrite.

---

## PHASE 3 — Foundation (scaffold)  `NEW CHAT`

```text
Read CLAUDE.md, BRIEF.md and DESIGN.md. Create the project foundation only, no page sections yet.

- Scaffold the approved stack (latest stable Next.js, TypeScript, Tailwind, ESLint, App Router,
  src directory, static export). If create-next-app refuses because the folder is not empty,
  scaffold in a temp folder and move files in, merging .gitignore so my .env* rules stay.
- Install approved dependencies with npm (GSAP + @gsap/react, Lenis, MDX tooling, and what the
  brief needs). Tell me every package and why.
- Turn DESIGN.md into code: Tailwind tokens (colors, type, spacing, radius, shadows, motion
  durations/easings), fonts via next/font, global CSS.
- Create providers: Lenis synced with ScrollTrigger, GSAP plugin registration, a reduced-motion
  and mobile helper (gsap.matchMedia), and a page transition shell.
- Create the folder structure, placeholder routes for the pages in BRIEF.md, content folders
  (content/posts, content/team, content/areas) with typed loaders, and npm scripts for lint,
  typecheck and build.

Run lint, typecheck and build. Verify .gitignore. Commit the verified result. Never push.
```

---

## PHASE 4 — Landing page (the "wow" page)  `NEW CHAT`

```text
/website-design:landing-page

Read CLAUDE.md, BRIEF.md, and DESIGN.md. Build only the landing page UI defined in the brief.
Follow the design system exactly. Use emil-design-eng for animations and micro-interactions and
the GSAP skills for scroll work. Use only fictional data from BRIEF.md; invent no testimonials,
results or claims.

Build the signature moment FIRST and get it right before anything else. Then build section by
section: loading animation (skipped on repeat visits, never blocking LCP), hero intro, pinned
scroll sections, text reveals, image reveals, parallax, Lenis smooth scrolling.

After EACH section, run this loop before committing:
1. Open it in the browser, screenshot desktop and mobile.
2. Critique it honestly against DESIGN.md and the approved references: hierarchy, spacing,
   type, contrast, motion softness, anything generic.
3. Fix, check reduced-motion, run lint/typecheck, then commit.
```

Typical sections: hero, positioning statement, practice areas (pinned/horizontal), approach,
numbers (labeled fictional), team preview, latest articles, WhatsApp/social CTA, footer.

**GATE:** open on your phone, on desktop, and with Windows "reduce motion" on. All three must look great.

---

## PHASE 5 — Taste pass on the landing page  `NEW CHAT`

Run each prompt separately and commit after each.

```text
Read CLAUDE.md and DESIGN.md. Use Impeccable to critique the landing page like a senior art
director: hierarchy, rhythm, whitespace, type, color, imagery, consistency, anything that feels
templated or AI-generated. Give me a ranked list, fix the top items, screenshot before/after on
desktop and mobile, and commit.
```

```text
Read CLAUDE.md and DESIGN.md. Use emil-design-eng to audit every animation and interaction on the
landing page: easing, duration, stagger rhythm, interruptibility, hover/press states, entry and
exit symmetry, nothing abrupt or bouncy without reason. Check 60fps with 4x CPU throttle and
touch behavior. Fix and commit.
```

```text
Read CLAUDE.md and DESIGN.md. Use Impeccable's polish pass: alignment, optical spacing, focus
states, selection color, scrollbar, cursor, loading and empty states, 404 feel. Commit.
```

**GATE:** if it does not make you proud, tell Claude exactly what feels off and iterate here, not later.

---

## PHASE 6 — Inner pages, one at a time  `NEW CHAT`

```text
Read CLAUDE.md, BRIEF.md and DESIGN.md. Build the page <PAGE> only, following the design system and
motion section, with the same soft-feel and signature language as the landing page. Use
emil-design-eng and the GSAP skills. Read content from src/content. Responsive, accessible,
reduced-motion safe. Screenshot desktop and mobile, critique against DESIGN.md, fix, run checks,
and commit.
```

`<PAGE>` in order:
1. **Áreas de Atuação:** index + dynamic page per area.
2. **Equipe:** grid + member pages (OAB numbers clearly fictional).
3. **Sobre.**
4. **Blog / Insights:** index with tags, MDX article page with beautiful reading typography.
5. **Contato:** WhatsApp CTA, social links, lazy-loaded scheduling embed.
6. **Privacidade, 404.**
7. **Page transitions** site-wide (consistent, interruptible, fast).

---

## PHASE 7 — Content and images  `NEW CHAT`

```text
Read CLAUDE.md, BRIEF.md and DESIGN.md. Finalize the content layer:
- 6-8 realistic educational MDX articles (no promises of results, with disclaimers), team and
  practice areas with frontmatter schemas validated at build time.
- Static generation for every route.
- Optimize all images (next/image, correct sizes, AVIF/WebP), consistent grade, no layout shift,
  meaningful alt text.
- Everything fictional and consistent with BRIEF.md.
Test, run the build, commit.
```

---

## PHASE 8 — Small interactive touches (optional)  `NEW CHAT`

```text
Read CLAUDE.md, BRIEF.md and DESIGN.md. Implement these one at a time, browser-only, no backend:
<pick: blog tag filter, floating WhatsApp button, dark/light theme, reading progress, custom
cursor>. After each: screenshot, run checks, review the diff, commit. Never push.
```

---

## PHASE 9 — Final audits  `NEW CHAT`

**9.1 Smoothness**

```text
Run a production build and measure Lighthouse performance on mobile for home, an area page and an
article. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms. Fix image weight, fonts, code-splitting of
GSAP, lazy loading, long tasks, scroll jank. Commit with before/after numbers.
```

**9.2 Accessibility**

```text
Run Impeccable audits for accessibility, contrast and mobile layout. Check keyboard navigation,
focus states, screen-reader labels, reduced motion and 200% zoom. Run the web-design-guidelines
review. Fix actionable findings and commit.
```

**9.3 Final review against the references**

```text
/website-design:review-page

Read CLAUDE.md, BRIEF.md, and DESIGN.md. Review the complete website and fix the highest-priority
issues. Run Impeccable's audits for design, accessibility, contrast, and mobile layout.
Verify responsive layouts, navigation, console errors, lint, typecheck and the production build.
Then compare the finished site, screenshot by screenshot, against the approved reference sites
from Phase 2: where does it fall short on taste, motion softness, clarity or mobile experience?
Fix what is actionable, commit, and report remaining issues. Never push.
```

**GATE:** test on a real phone; show 2-3 people for a 5-second first impression.

---

## PHASE 10 — Deploy (you drive)

1. Create the GitHub repo and push yourself (`gh repo create`, `git push`). Claude never pushes.
2. Import into Vercel (Hobby) or Cloudflare Pages. No environment variables needed.
3. Ask Claude to smoke-test the preview URL on desktop and mobile with the browser.

---

## PHASE 11 — Showcase

- Screen-record hero intro, pinned scroll, page transitions and mobile at 60fps, plus a short vertical cut.
- Write a case study: research, design decisions, motion stack, performance numbers.

---

## What makes it "damn, who built this?"

1. One signature moment, not ten effects.
2. Restraint and rhythm: whitespace, confident type, two fonts maximum.
3. Real, consistently graded photography.
4. Soft motion with purpose: long ease-out curves, gentle staggers, nothing abrupt. In law,
   gravity beats flashiness.
5. Fast. Beautiful but slow is not a reference.
6. Mobile is its own design.
7. Craft in the details: focus states, loading, 404, selection color.
8. Accessible: reduced motion, keyboard, contrast.

## Common pitfalls

| Pitfall | Prevention |
|---|---|
| Project inside OneDrive | move to `C:\dev\...` |
| Generic template look | Phase 2 three-direction choice + "never do" list + Phase 5 critique |
| Motion feels harsh or janky | motion tokens, emil audit, transform/opacity only, one Lenis |
| Heavy hero video hurts mobile | compressed video + poster, static fallback |
| Animation leaks in React | `useGSAP` with scope and cleanup |
| Layout shift | width/height or aspect-ratio, `next/font` |
| Stock-photo look | consistent grading, fewer but better images |
| Fake testimonials/results | forbidden; label all demo content |
| Context drift | new chat per phase |

## Cheat sheet

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run lint
```
