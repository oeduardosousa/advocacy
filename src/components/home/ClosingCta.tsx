import { TransitionLink } from "@/components/providers/PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";
import { Seal } from "@/components/ui/Seal";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { CONTACT, ROUTES } from "@/lib/site";

/** Closing band: the one deliberate Ink section besides the footer (The Dark Is a Section Rule). */
export function ClosingCta() {
  return (
    <section
      id="contato-cta"
      aria-labelledby="cta-title"
      className="relative z-20 bg-ink text-paper"
    >
      <div className="container-page section-major">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label col-span-4 text-ink-dim sm:col-span-8 lg:col-span-2 lg:text-right">
            Próximo passo
          </p>
          <h2
            id="cta-title"
            data-reveal="lines"
            className="type-headline col-span-4 sm:col-span-8 lg:col-span-9"
          >
            Conte o seu contexto e vamos <em className="italic">conversar com calma.</em>
          </h2>

          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-3">
            <p data-reveal="block" className="type-lead text-ink-dim">
              O primeiro contato é pelo WhatsApp. Se preferir, agende um horário para conversar.
            </p>
            <div data-reveal="block" className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp border-oxblood-on-ink"
                >
                  <WhatsAppGlyph />
                  Conversar no WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </Magnetic>
              <TransitionLink href={ROUTES.contact} className="btn btn-secondary-ink">
                Agendar uma conversa
              </TransitionLink>
            </div>
            <p className="type-small mt-6 text-ink-dim">
              Contato de demonstração: número e horários fictícios. Projeto conceito.
            </p>
          </div>

          <div className="col-span-4 flex sm:col-span-2 lg:col-span-2 lg:col-start-11 lg:items-end lg:justify-end">
            <Seal onInk />
          </div>
        </div>
      </div>
    </section>
  );
}
