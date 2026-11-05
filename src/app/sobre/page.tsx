import type { Metadata } from "next";

import { Approach } from "@/components/home/Approach";
import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Como o escritório pensa e trabalha. Conteúdo de demonstração, escritório fictício.",
};

const VALUES = [
  {
    title: "Clareza",
    text: "Explicar o que está acontecendo, quais são as alternativas e o que cada uma exige, sem jargão desnecessário.",
  },
  {
    title: "Discrição",
    text: "Tratar cada conversa com reserva. O que é dito no atendimento fica no atendimento.",
  },
  {
    title: "Cuidado técnico",
    text: "Estudar o caso com atenção, registrar o que importa e manter o trabalho documentado.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Sobre"
        title={
          <>
            Um escritório que <em className="italic">começa por escutar.</em>
          </>
        }
        lead="Esta página descreve, em texto de demonstração, a forma como um escritório de advocacia pode se apresentar: com calma, sem promessas e em linguagem simples."
      >
        <p data-reveal="block" className="type-small mt-6 text-ink-mute">
          Projeto conceito: o escritório, as pessoas e os textos são fictícios.
        </p>
      </PageHeader>

      <Band labelledBy="story-title" tone="light">
        <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-3">
          <h2 id="story-title" data-reveal="lines" className="type-title">
            O ponto de partida.
          </h2>
          <div data-reveal="block" className="mt-6 space-y-5">
            <p className="type-article text-ink-soft">
              O escritório imaginado aqui nasce de uma ideia simples: a maior parte das pessoas
              procura um advogado num momento de dúvida, e a primeira necessidade é ser ouvida.
            </p>
            <p className="type-article text-ink-soft">
              Por isso o atendimento começa pela conversa, antes de qualquer documento. Só depois
              vêm a análise, a explicação dos caminhos possíveis e o acompanhamento.
            </p>
            <p className="type-small text-ink-mute">
              Texto de demonstração. Não há história, data de fundação ou número real associado a
              este escritório.
            </p>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-5 lg:col-span-4 lg:col-start-9">
          <Photo
            src="/img/demo/post-2.svg"
            alt="Ilustração de demonstração: folhas de papel e luz de janela sobre uma mesa."
            ratio="aspect-[4/5]"
            sizes="(min-width: 1024px) 30vw, 80vw"
          />
          <p className="type-small mt-3 text-ink-mute">Imagem ilustrativa de demonstração.</p>
        </div>
      </Band>

      <Band label="Valores" labelledBy="values-title">
        <h2
          id="values-title"
          data-reveal="lines"
          className="type-headline col-span-4 sm:col-span-8 lg:col-span-9"
        >
          O que orienta o trabalho.
        </h2>
        <ul
          data-reveal="items"
          className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3"
        >
          {VALUES.map((value, i) => (
            <li
              key={value.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-8 last:border-b sm:grid-cols-[3.5rem_1fr_1.2fr]"
            >
              <span className="type-label pt-3 tabular-nums text-oxblood">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-title">{value.title}</h3>
              <p className="type-body col-start-2 mt-3 max-w-[44ch] text-ink-soft sm:col-start-3 sm:mt-0">
                {value.text}
              </p>
            </li>
          ))}
        </ul>
        <p className="type-small col-span-4 text-ink-mute sm:col-span-8 lg:col-span-8 lg:col-start-3">
          Valores de demonstração. O conteúdo é informativo e não constitui aconselhamento
          jurídico.
        </p>
      </Band>

      <Approach />

      <Band>
        <div className="col-span-4 flex flex-wrap gap-x-10 gap-y-2 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <TransitionLink href={ROUTES.team} className="link-quiet text-ink">
            Conhecer a equipe
            <ArrowRight />
          </TransitionLink>
          <TransitionLink href={ROUTES.areas} className="link-quiet text-ink">
            Ver áreas de atuação
            <ArrowRight />
          </TransitionLink>
        </div>
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
