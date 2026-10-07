"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { WhatsApp } from "@/components/ui/icons";
import { categories, getProduct } from "@/content/catalog";
import { whatsappLink } from "@/content/site";

const field = "h-11 w-full rounded-sm border border-[#cfd4d9] bg-white px-3 text-sm font-normal text-graphite outline-none transition-colors placeholder:text-[#9aa2aa] focus:border-signal-red";
const label = "grid gap-1.5 text-xs font-semibold text-graphite";

export function ContactForm() {
  const params = useSearchParams();
  const product = getProduct(params.get("produto") ?? "");
  const productLabel = product ? `${product.code ? `${product.code} · ` : ""}${product.name}` : "";
  const [message, setMessage] = useState<string | null>(null);

  function submit(formData: FormData) {
    const get = (key: string) => String(formData.get(key) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    if (!name || !phone) {
      setMessage("Informe nome e telefone para continuar.");
      return;
    }
    const text = [
      `Olá, sou ${name}.`,
      get("company") && `Empresa: ${get("company")}.`,
      get("customer") && `Cliente: ${get("customer")}.`,
      `Telefone: ${phone}.`,
      get("email") && `E-mail: ${get("email")}.`,
      get("interest") && `Interesse: ${get("interest")}.`,
      get("details") && `Mensagem: ${get("details")}`,
    ]
      .filter(Boolean)
      .join("\n");
    setMessage("Abrindo a conversa no WhatsApp…");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form action={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>Nome*<input autoComplete="name" className={field} name="name" required /></label>
        <label className={label}>Empresa<input autoComplete="organization" className={field} name="company" /></label>
        <label className={label}>
          Tipo de cliente
          <select className={field} defaultValue="" name="customer">
            <option value="">Selecione</option>
            <option>Empresa (CNPJ)</option>
            <option>Pessoa física (CPF)</option>
          </select>
        </label>
        <label className={label}>Telefone / WhatsApp*<input autoComplete="tel" className={field} inputMode="tel" name="phone" placeholder="(11) 90000-0000" required /></label>
        <label className={`${label} sm:col-span-2`}>E-mail<input autoComplete="email" className={field} name="email" placeholder="seu@email.com" type="email" /></label>
        <label className={`${label} sm:col-span-2`}>
          Produto ou família de interesse
          <select className={field} defaultValue={productLabel} name="interest">
            <option value="">Selecione</option>
            {productLabel ? <option value={productLabel}>{productLabel}</option> : null}
            {categories.map((category) => <option key={category.slug}>{category.label}</option>)}
          </select>
        </label>
      </div>
      <label className={label}>
        Mensagem
        <textarea className={`${field} h-auto min-h-28 py-2.5`} name="details" placeholder="Descreva a aplicação, a medida ou o código da série." />
      </label>
      <button className="signal-button mt-1 w-full" type="submit">
        <WhatsApp className="text-base" /> Enviar pelo WhatsApp
      </button>
      <p className="text-xs leading-5 text-steel">Seus dados não ficam salvos no site. O envio abre uma conversa no WhatsApp oficial da LSQ.</p>
      <p aria-live="polite" className="text-sm font-medium text-signal-red-strong">{message}</p>
    </form>
  );
}
