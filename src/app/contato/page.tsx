import type { Metadata } from "next";

import { Scheduler } from "@/components/contact/Scheduler";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { TransitionLink } from "@/components/providers/PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight, WhatsAppGlyph } from "@/components/ui/icons";
import { CONTACT, ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "WhatsApp, redes e agendamento. Contatos de demonstração, escritório fictício.",
};

const SOCIAL = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "LinkedIn", href: CONTACT.linkedin },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contato"
        title={
          <>
            Conte o seu contexto, <em className="italic">sem pressa.</em>
          </>
        }
        lead="O primeiro contato é pelo WhatsApp. Se preferir, escolha um horário na agenda."
      >
        <div data-reveal="block" className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppGlyph />
              Conversar no WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </Magnetic>
        </div>
        <p className="type-small mt-5 text-ink-mute">
          Contato de demonstração: o número é fictício e não recebe mensagens.
        </p>
      </PageHeader>

      <Band tone="light" labelledBy="schedule-title">
        <h2
          id="schedule-title"
          data-reveal="lines"
          className="type-title col-span-4 sm:col-span-8 lg:col-span-9"
        >
          Agende uma conversa.
        </h2>
        <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <Scheduler />
        </div>
      </Band>

      <Band label="Visita" labelledBy="where-title" tone="paper">
        <h2 id="where-title" className="sr-only">
          Endereço, horários e redes
        </h2>
        <div
          data-reveal="items"
          className="col-span-4 grid gap-10 sm:col-span-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-3"
        >
          <div>
            <p className="type-label text-ink-mute">Endereço</p>
            <address className="type-body mt-3 not-italic text-ink-soft">
              {CONTACT.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="type-small mt-3 text-ink-mute">
              Endereço fictício. Nenhum mapa é carregado nesta página.
            </p>
          </div>
          <div>
            <p className="type-label text-ink-mute">Atendimento</p>
            <p className="type-body mt-3 text-ink-soft">{CONTACT.hours}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="type-label text-ink-mute">Redes</p>
            <ul className="mt-3 flex flex-wrap gap-x-8">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  {item.href === "#" ? (
                    <span className="type-body inline-flex min-h-11 items-center gap-2 text-ink-mute">
                      {item.label}
                      <span className="type-small">(perfil de demonstração, sem link)</span>
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet text-ink"
                    >
                      {item.label}
                      <ArrowUpRight />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="type-small col-span-4 text-ink-mute sm:col-span-8 lg:col-span-8 lg:col-start-3">
          {SITE.notice} Veja também a{" "}
          <TransitionLink
            href={ROUTES.privacy}
            className="underline decoration-ink-dim underline-offset-4 hover:decoration-oxblood"
          >
            Política de Privacidade
          </TransitionLink>
          .
        </p>
      </Band>
      <HomeMotion />
    </>
  );
}
