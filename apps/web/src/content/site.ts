/**
 * Marca. Para trocar o logo pelo arquivo oficial da LSQ Brasil, substitua
 * /public/brand/lsq-logo.png (ou aponte `logo.src` para o novo arquivo) e ajuste width/height
 * para a proporção real do arquivo. PENDENTE: hoje é o logo da matriz (松 LSQ 乔).
 */
export const brand = {
  name: "LSQ XH",
  logo: { src: "/brand/lsq-logo-reference.png", width: 480, height: 241 },
  mascot: { full: "/brand/lsquinho.webp", peek: "/brand/lsquinho-peek.webp", name: "LSquinho" },
} as const;

/** Dados de contato confirmados (docs/00-governance/PROJECT_STATE.md). */
export const contact = {
  phoneDisplay: "(11) 99828-7440",
  phoneHref: "tel:+5511998287440",
  whatsappNumber: "5511998287440",
  /** Dados do site atual (lsq-coupling.com.br), confirmados pelo responsável em 2026-10-07. */
  phone2Display: "(11) 96349-5585",
  phone2Href: "tel:+5511963495585",
  email: "info@lsq-coupling.com.br",
  hours: "Segunda a sexta, das 8h às 17h",
  address: {
    street: "Av. Dom Pedro I, 235",
    district: "Vila Monumento",
    city: "São Paulo - SP",
    zip: "01552-001",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Dom+Pedro+I%2C+235+-+Vila+Monumento%2C+S%C3%A3o+Paulo+-+SP%2C+01552-001",
  legalName: "LSQ XH Conector de Fluido Comércio Importação e Exportação Ltda.",
  cnpj: "54.390.320/0001-24",
} as const;

export const fullAddress = `${contact.address.street} - ${contact.address.district}, ${contact.address.city}, ${contact.address.zip}`;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Tour 360 já publicado pela LSQ (docs/ASSET_PROVENANCE.md). */
export const factoryTourUrl = "https://vr.ecerimg.com/data/0b/8b/quick-connectcoupling/vr/index.html";

export interface MediaAsset {
  src: string;
  alt: string;
  /**
   * true = imagem de ambientação gerada para a proposta, não é foto real da LSQ.
   * O site mostra a legenda "Imagem ilustrativa" enquanto for true.
   * Troque o arquivo pela foto real e mude para false.
   */
  illustrative: boolean;
}

/** Imagens de ambientação. Para trocar, substitua o arquivo em /public/media mantendo o nome. */
export const media = {
  macro: { src: "/media/macro-produto.webp", alt: "Detalhe usinado de um engate rápido", illustrative: true },
  factoryExterior: { src: "/media/fabrica-matriz.webp", alt: "Sede da fábrica da matriz Songqiao na China", illustrative: false },
  factoryInterior: { src: "/media/fabrica-interior.webp", alt: "Linha de produção com centros de usinagem", illustrative: true },
  quality: { src: "/media/controle-qualidade.webp", alt: "Inspeção dimensional de um engate com paquímetro", illustrative: true },
  warehouse: { src: "/media/estoque.webp", alt: "Corredor de armazenagem com engates e componentes", illustrative: true },
  contact: { src: "/media/contato.webp", alt: "Engate rápido iluminado por luz vermelha", illustrative: true },
} as const satisfies Record<string, MediaAsset>;
