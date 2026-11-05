import type { Metadata } from "next";

import { MessageForm } from "@/components/contact/MessageForm";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description: "Escreva sua mensagem e continue a conversa pelo WhatsApp. Contato de demonstração.",
};

export default function MessagePage() {
  return (
    <>
      <PageHeader
        label="Fale Conosco"
        title={
          <>
            Escreva o seu contexto, <em className="italic">sem pressa.</em>
          </>
        }
        lead="Conte o que está acontecendo. Ao enviar, abrimos o WhatsApp com a sua mensagem pronta."
      />
      <Band tone="light" labelledBy="message-title">
        <h2 id="message-title" className="sr-only">
          Formulário de mensagem
        </h2>
        <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <MessageForm />
          <p className="type-small mt-5 text-ink-mute">
            Contato de demonstração: o número é fictício e não recebe mensagens.
          </p>
        </div>
      </Band>
      <HomeMotion />
    </>
  );
}
