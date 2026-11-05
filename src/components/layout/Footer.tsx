import { TransitionLink } from "@/components/providers/PageTransition";
import { getAreas } from "@/lib/content";
import { CONTACT, NAV_LINKS, ROUTES, SITE } from "@/lib/site";

const linkClass =
  "inline-flex min-h-11 items-center text-ink-dim transition-colors duration-[160ms] hover:text-oxblood-on-ink";

/** Ink footer: wordmark, areas, navigation, contact, the demo notice and the OAB-safe disclaimer. */
export function Footer() {
  const areas = getAreas();
  return (
    <footer className="relative z-20 bg-ink text-ink-dim">
      <div className="container-page pb-[calc(56px+env(safe-area-inset-bottom)+32px)] pt-24 lg:pb-8">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-4 sm:col-span-8 lg:col-span-4">
            <p className="font-serif text-[1.75rem] leading-none tracking-[-0.01em] text-paper">
              {SITE.name}
            </p>
            <p className="type-small mt-4 max-w-[34ch]">Escritório de advocacia fictício, criado como projeto conceito.</p>
          </div>

          <nav aria-label="Áreas de atuação" className="col-span-4 sm:col-span-4 lg:col-span-3">
            <p className="type-label mb-3 text-paper">Áreas</p>
            <ul className="type-small">
              {areas.map((area) => (
                <li key={area.slug}>
                  <TransitionLink href={ROUTES.area(area.slug)} className={linkClass}>
                    {area.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rodapé" className="col-span-2 sm:col-span-2 lg:col-span-2">
            <p className="type-label mb-3 text-paper">Navegação</p>
            <ul className="type-small">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className={linkClass}>
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <p className="type-label mb-3 text-paper">Contato</p>
            <ul className="type-small">
              <li>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} className={linkClass}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedin} className={linkClass}>
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="type-small mt-3">Endereço e telefone de demonstração.</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ink-soft pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="type-small max-w-[70ch] space-y-1">
            <p>{SITE.notice}</p>
            <p>{SITE.disclaimer}</p>
          </div>
          <TransitionLink href={ROUTES.privacy} className={`${linkClass} type-small shrink-0`}>
            Política de Privacidade
          </TransitionLink>
        </div>

        <p className="type-small mt-10 border-t border-ink-soft pt-6">Feito por Eduardo Sousa</p>
      </div>
    </footer>
  );
}
