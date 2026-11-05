# BRIEF — Advocacy Portfolio Website

## Business
A portfolio demo website for a fictional full-service Brazilian law firm ("escritório de advocacia"). Built as a showcase of design and motion quality. No real client; all firm names, people and cases are clearly labeled placeholders.

## Audience
- Primary: individuals and small/mid businesses in Brazil seeking legal help, who judge credibility in seconds on mobile.
- Secondary: prospective employers/clients of the developer evaluating the portfolio piece.

## Goals
1. Build authority and trust (team, areas, editorial content).
2. Direct visitors to social media / WhatsApp (primary CTA).
3. Publish legal insights (blog).

## Language
Portuguese (pt-BR) only.

## Pages & Content
- Home (cinematic hero, areas overview, firm approach, team preview, latest articles, CTA)
- Sobre (about: history, values, approach)
- Áreas de Atuação (index + one page per area: civil, trabalhista, empresarial, família e sucessões, consumidor, tributário — adjustable)
- Equipe (team grid + member pages)
- Blog / Insights (index + article pages, MDX files)
- Contato (WhatsApp CTA, social links, Cal.com/Calendly embed, address/map placeholder)
- Legal: Política de Privacidade (LGPD), cookie notice if analytics used

## Features
- WhatsApp click-to-chat CTA (persistent, mobile-first), social media links.
- Scheduling via third-party embed (Cal.com or Calendly) as secondary CTA. No database on our side.
- MDX content collections: posts, team, practice areas. Tags and reading time.
- Motion: bold, cinematic — hero intro, pinned scroll sections, text reveals, smooth scroll, page transitions (library per effect defined in DESIGN.md).
- Accessibility (WCAG AA), reduced-motion support, responsive 360px–1920px.

## Design Direction
Open. To be proposed after researching reference sites (niche + best-in-class + motion references) and approved before DESIGN.md is written.

## Stack (approved)
- Next.js App Router, TypeScript, static export (`output: 'export'`)
- Tailwind CSS
- MDX content in repo (no CMS, no database)
- GSAP + ScrollTrigger, Lenis smooth scroll
- Why: content-driven static site, fastest and free to host, full control for custom motion, simple to maintain.

## Deployment
Free tier on Vercel or Cloudflare Pages (static). No custom domain yet. Budget: zero. Production changes require approval.

## Acceptance Criteria
- All pages above exist and render with demo content, no console errors.
- Lighthouse on mobile for the home page: Performance ≥ 90, Accessibility ≥ 95.
- Passes lint, typecheck, production build.
- Motion degrades gracefully with prefers-reduced-motion and on low-end mobile.
- WhatsApp CTA and social links work; scheduling embed loads lazily.
- No invented testimonials, results or claims.

## Assumptions
- Fictional firm name and content are acceptable for a demo.
- Photography uses placeholders/licensed stock or generated assets, to be decided at design stage.
- No analytics initially; add privacy-friendly analytics only on approval.

## Open Questions
- Fictional firm name and practice-area list final selection.
- Scheduler choice: Cal.com vs Calendly.
- Final visual direction (after research).
- Social networks to link (Instagram, LinkedIn, etc.) and demo WhatsApp number.
