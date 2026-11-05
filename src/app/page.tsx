import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ROUTES } from "@/lib/site";

const LINKS = [
  ["Sobre", ROUTES.about],
  ["Áreas de Atuação", ROUTES.areas],
  ["Equipe", ROUTES.team],
  ["Blog", ROUTES.blog],
  ["Contato", ROUTES.contact],
  ["Privacidade", ROUTES.privacy],
] as const;

export default function HomePage() {
  return (
    <PagePlaceholder
      title="Cada caso começa por escutar."
      description="Fundação do projeto pronta; as seções da home entram na próxima etapa. Texto de demonstração."
    >
      <nav aria-label="Páginas do projeto">
        <ul className="type-label flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <TransitionLink
                href={href}
                className="underline decoration-rule underline-offset-6 hover:decoration-oxblood"
              >
                {label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    </PagePlaceholder>
  );
}
