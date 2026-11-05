"use client";

import { useState } from "react";

import { CONTACT } from "@/lib/site";

/**
 * Scheduling embed (Cal.com), loaded lazily and only on request: nothing from the
 * third party is fetched until the visitor presses the button, which also keeps the
 * page free of trackers (no consent banner needed). The iframe itself is loading="lazy".
 */
export function Scheduler() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="border border-rule bg-paper-light">
      {loaded ? (
        <iframe
          src={CONTACT.schedulerUrl}
          title="Agenda de demonstração (Cal.com)"
          loading="lazy"
          className="block h-[640px] w-full"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="flex min-h-[320px] flex-col items-start justify-between gap-8 p-8 sm:p-12">
          <div>
            <p className="type-label text-ink-mute">Agenda</p>
            <p className="type-title mt-3 max-w-[22ch]">Escolha um horário para conversar.</p>
            <p className="type-small mt-4 max-w-[48ch] text-ink-mute">
              O calendário é de um serviço externo e só é carregado quando você pede. Horários de
              demonstração: nenhum atendimento real é agendado.
            </p>
          </div>
          <button type="button" onClick={() => setLoaded(true)} className="btn btn-secondary">
            Carregar agenda
          </button>
        </div>
      )}
    </div>
  );
}
