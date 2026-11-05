/** Sheet 2 — slides over the hero (the page turn). Copy is demo content. */
export function Positioning() {
  return (
    <section
      id="posicionamento"
      data-sheet="next"
      aria-labelledby="positioning-title"
      className="sheet"
    >
      <div className="container-page section-major">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
            02 — Posicionamento
          </p>
          <h2
            id="positioning-title"
            data-reveal="lines"
            className="type-headline col-span-4 sm:col-span-8 lg:col-span-9 lg:col-start-3"
          >
            Direito explicado com clareza, <em className="italic">conduzido com método.</em>
          </h2>
          <div className="col-span-4 sm:col-span-6 sm:col-start-3 lg:col-span-5 lg:col-start-7">
            <p data-reveal="block" className="type-lead text-ink-soft">
              Combinamos atenção ao detalhe e linguagem simples para que cada pessoa entenda o caminho
              antes de percorrê-lo.
            </p>
            <p className="type-small mt-6 text-ink-mute">
              Texto de demonstração. Conteúdo informativo, sem caráter de aconselhamento jurídico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
