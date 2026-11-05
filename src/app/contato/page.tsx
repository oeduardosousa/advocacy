import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      title="Contato"
      description="WhatsApp, redes sociais e agendamento (conteúdo de demonstração)."
    />
  );
}
