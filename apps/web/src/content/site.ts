/** Dados de contato confirmados (docs/00-governance/PROJECT_STATE.md). */
export const contact = {
  phoneDisplay: "(11) 99828-7440",
  phoneHref: "tel:+5511998287440",
  whatsappNumber: "5511998287440",
} as const;

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
  factoryExterior: { src: "/media/fabrica-exterior.webp", alt: "Fachada de unidade fabril", illustrative: true },
  factoryInterior: { src: "/media/fabrica-interior.webp", alt: "Linha de produção com centros de usinagem", illustrative: true },
  quality: { src: "/media/controle-qualidade.webp", alt: "Inspeção dimensional de um engate com paquímetro", illustrative: true },
  warehouse: { src: "/media/estoque.webp", alt: "Corredor de armazenagem com engates e componentes", illustrative: true },
  contact: { src: "/media/contato.webp", alt: "Engate rápido iluminado por luz vermelha", illustrative: true },
} as const satisfies Record<string, MediaAsset>;
