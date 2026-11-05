import { Photo } from "@/components/ui/Photo";

const STEPS = [
  {
    title: "Escuta",
    text: "Começamos ouvindo o seu contexto, sem pressa e sem juridiquês.",
  },
  {
    title: "Análise",
    text: "Reunimos fatos e documentos e avaliamos, com cuidado, os caminhos possíveis.",
  },
  {
    title: "Orientação",
    text: "Explicamos as alternativas, os prazos e os custos envolvidos, com transparência.",
  },
  {
    title: "Acompanhamento",
    text: "Mantemos você informado a cada etapa do trabalho, em linguagem clara.",
  },
] as const;

/** Sheet 4 — how the firm works. Recessed band (Paper Deep) with the drawn margin rule. */
export function Approach() {
  return (
    <section
      id="abordagem"
      aria-labelledby="approach-title"
      data-margin-scope
      className="relative z-20 bg-paper-deep"
    >
      <div className="container-page section-major">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="relative col-span-4 sm:col-span-8 lg:col-span-2 lg:row-span-2">
            <p className="type-label margin-label text-ink-mute lg:text-right lg:pr-6">Abordagem</p>
            <div
              aria-hidden="true"
              data-margin-rule
              className="absolute bottom-0 right-0 top-10 hidden w-px origin-top bg-oxblood lg:block"
            />
          </div>

          <h2
            id="approach-title"
            data-reveal="lines"
            className="type-headline col-span-4 sm:col-span-8 lg:col-span-9"
          >
            Um caminho claro, do primeiro contato ao acompanhamento.
          </h2>

          <div className="col-span-4 sm:col-span-5 lg:col-span-4 lg:col-start-3">
            <Photo
              src="/img/demo/approach.svg"
              alt="Ilustração de demonstração: feixe de luz sobre uma parede, com folhas de papel sobre uma mesa."
              ratio="aspect-[4/5]"
              parallax
              sizes="(min-width: 1024px) 33vw, 80vw"
            />
            <p className="type-small mt-3 text-ink-mute">Imagem ilustrativa de demonstração.</p>
          </div>

          <ol
            data-reveal="items"
            className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end"
          >
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-ink-dim py-6 first:border-t-0 lg:first:border-t">
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                  <span className="type-label pt-2 tabular-nums text-oxblood">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="type-title">{step.title}</h3>
                    <p className="type-body mt-2 max-w-[44ch] text-ink-soft">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
