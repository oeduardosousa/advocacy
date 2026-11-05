/** Site-wide constants. Everything here is demo content (fictional firm). */

export const SITE = {
  /** Placeholder wordmark, final fictional name still open (BRIEF.md). */
  name: "Escritório Demo",
  notice: "Projeto conceito: escritório e conteúdo fictícios.",
  disclaimer:
    "Conteúdo meramente informativo, sem caráter de aconselhamento jurídico.",
} as const;

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
