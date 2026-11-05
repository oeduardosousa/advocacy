import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      title="Política de Privacidade"
      description="Política de privacidade e LGPD (conteúdo de demonstração)."
    />
  );
}
