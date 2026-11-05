import type { Metadata } from "next";

import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Modelo de política de privacidade (LGPD) para o projeto conceito. Conteúdo de demonstração.",
};

const SECTIONS = [
  {
    id: "dados",
    title: "Quais dados são tratados",
    body: [
      "Este site não possui formulários, contas de usuário, banco de dados nem ferramentas de análise ou publicidade. Por isso, ele não coleta dados pessoais por conta própria.",
      "Os registros técnicos mínimos de acesso (como endereço IP e data da visita) podem ser mantidos pela hospedagem, para fins de segurança e funcionamento.",
    ],
  },
  {
    id: "terceiros",
    title: "Serviços de terceiros",
    body: [
      "O botão de WhatsApp leva a uma conversa no aplicativo, que tem política própria. O calendário de agendamento é um serviço externo e só é carregado quando você aciona o botão “Carregar agenda”.",
      "Ao usar esses serviços, o tratamento dos seus dados passa a seguir as regras de cada provedor.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    body: [
      "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante ao titular direitos como confirmação do tratamento, acesso, correção, anonimização, eliminação e informação sobre o compartilhamento de dados.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies e armazenamento",
    body: [
      "Este site usa apenas um registro local, no seu navegador, para lembrar que a animação de abertura já foi exibida na sessão. Ele não identifica você e não é enviado a ninguém.",
    ],
  },
  {
    id: "contato",
    title: "Controlador e contato",
    body: [
      "Como o escritório é fictício, não há controlador de dados nem canal de privacidade reais. Em um projeto real, esta seção traria o nome do responsável e um e-mail de contato.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Legal"
        title="Política de Privacidade"
        lead="Um modelo em linguagem simples sobre como um site como este trata dados pessoais, nos termos da LGPD."
      >
        <p data-reveal="block" className="type-small mt-6 text-ink-mute">
          Documento de demonstração, sem valor jurídico. {SITE.notice}
        </p>
      </PageHeader>

      <Band tone="light" labelledBy="privacy-toc">
        <nav
          aria-labelledby="privacy-toc"
          className="col-span-4 sm:col-span-8 lg:col-span-3 lg:col-start-3"
        >
          <h2 id="privacy-toc" className="type-label text-ink-mute">
            Nesta página
          </h2>
          <ol className="mt-4 space-y-1 lg:sticky lg:top-28">
            {SECTIONS.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="type-body inline-flex min-h-11 items-center gap-3 text-ink-soft transition-colors duration-[160ms] hover:text-oxblood"
                >
                  <span className="type-label tabular-nums text-ink-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-6">
          {SECTIONS.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28 border-t border-rule py-10 first:border-t-0 first:pt-0"
            >
              <h2 id={`${section.id}-title`} className="type-title">
                <span className="type-label mr-3 align-middle tabular-nums text-oxblood">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="type-article text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
          <p className="type-small border-t border-rule pt-6 text-ink-mute">
            {SITE.disclaimer}
          </p>
        </div>
      </Band>
      <HomeMotion />
    </>
  );
}
