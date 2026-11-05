/** Site-wide constants. Everything here is demo content (fictional firm). */

export const SITE = {
  /** Placeholder wordmark, final fictional name still open (BRIEF.md). */
  name: "Escritório Demo",
  notice: "Projeto conceito: escritório e conteúdo fictícios.",
  disclaimer:
    "Conteúdo meramente informativo, sem caráter de aconselhamento jurídico.",
} as const;

/** Demo contact points. All placeholders: no real number or profile exists. */
export const CONTACT = {
  /** Fictional number (00). Replace before any real use. */
  whatsappUrl:
    "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20vim%20pelo%20site%20(projeto%20conceito).",
  instagram: "#",
  linkedin: "#",
} as const;

export const NAV_LINKS = [
  { label: "Sobre", href: "/sobre/" },
  { label: "Áreas de Atuação", href: "/areas-de-atuacao/" },
  { label: "Equipe", href: "/equipe/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contato", href: "/contato/" },
] as const;

/** Route map (pt-BR slugs, trailing slash because of static export). */
export const ROUTES = {
  home: "/",
  about: "/sobre/",
  areas: "/areas-de-atuacao/",
  team: "/equipe/",
  blog: "/blog/",
  contact: "/contato/",
  privacy: "/politica-de-privacidade/",
  area: (slug: string) => `/areas-de-atuacao/${slug}/`,
  member: (slug: string) => `/equipe/${slug}/`,
  post: (slug: string) => `/blog/${slug}/`,
} as const;
