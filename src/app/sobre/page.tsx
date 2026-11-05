import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Sobre" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="Sobre"
      description="Histórico, valores e forma de trabalho do escritório (conteúdo de demonstração)."
    />
  );
}
