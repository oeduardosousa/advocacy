"use client";

import { useState, type FormEvent } from "react";

import { WhatsAppGlyph } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site";

const fieldClass =
  "mt-2 block w-full border border-rule bg-paper-light px-4 py-3 text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none";

/**
 * Message composer: the visitor writes here, and on send the WhatsApp chat opens in a new
 * tab with the text already filled in. Nothing is stored or sent to a server by this site.
 */
export function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const invalid = message.trim().length === 0;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (invalid) return;
    const intro = name.trim() ? `Olá, meu nome é ${name.trim()}.` : "Olá.";
    window.open(whatsappLink(`${intro}\n\n${message.trim()}`), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-rule bg-paper-light p-6 sm:p-10">
      <div>
        <label htmlFor="mf-name" className="type-label text-ink-mute">
          Seu nome <span className="normal-case">(opcional)</span>
        </label>
        <input
          id="mf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${fieldClass} type-body`}
        />
      </div>

      <div className="mt-8">
        <label htmlFor="mf-message" className="type-label text-ink-mute">
          Sua mensagem
        </label>
        <textarea
          id="mf-message"
          name="message"
          rows={7}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSent(false);
          }}
          aria-invalid={touched && invalid}
          aria-describedby="mf-hint"
          placeholder="Conte, com as suas palavras, o que está acontecendo."
          className={`${fieldClass} type-body resize-y`}
        />
        <p id="mf-hint" role={touched && invalid ? "alert" : undefined} className="type-small mt-2 text-ink-mute">
          {touched && invalid
            ? "Escreva uma mensagem antes de enviar."
            : "Evite dados sensíveis, como documentos e senhas. Ao enviar, o WhatsApp abre com o texto pronto."}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-whatsapp">
          <WhatsAppGlyph />
          Enviar pelo WhatsApp
        </button>
        {sent ? (
          <p role="status" className="type-small text-ink-mute">
            O WhatsApp foi aberto em uma nova aba.
          </p>
        ) : null}
      </div>
    </form>
  );
}
