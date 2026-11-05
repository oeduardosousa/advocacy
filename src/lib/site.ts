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
  whatsappNumber: "5500000000000",
  /** Placeholder scheduler (Cal.com embed). Replace with a real booking link before any real use. */
  schedulerUrl: "https://cal.com/demo?embed=true&layout=month_view",
  instagram: "#",
  linkedin: "#",
  /** Fictional address, shown as a placeholder (no map is embedded). */
  address: ["Rua Exemplo, 000, sala 00", "Cidade Fictícia, UF 00000-000"],
  hours: "Segunda a sexta, 9h às 18h (horário de demonstração)",
} as const;

/** WhatsApp chat link with the visitor's message pre-filled. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

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
  message: "/fale-conosco/",
  privacy: "/politica-de-privacidade/",
  area: (slug: string) => `/areas-de-atuacao/${slug}/`,
  member: (slug: string) => `/equipe/${slug}/`,
  post: (slug: string) => `/blog/${slug}/`,
} as const;
