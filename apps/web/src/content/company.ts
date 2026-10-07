/**
 * Conteúdo institucional da matriz, fornecido pelo responsável em 2026-10-07
 * (texto da Songqiao e páginas Produção e Certificados do site atual da LSQ).
 */
export const matrix = {
  name: "Zhejiang Songqiao Pneumatic & Hydraulic Co., Ltd.",
  formerName: "Ningbo Welcome Pneumatic and Hydraulic Co., Ltd.",
  paragraphs: [
    "A Zhejiang Songqiao Pneumatic & Hydraulic Co., Ltd., anteriormente conhecida como Ningbo Welcome Pneumatic and Hydraulic Co., Ltd., atua desde 1983 e é um dos maiores fabricantes chineses de engates rápidos.",
    "Com mais de 300 equipamentos de produção e uma linha profissional de processamento e montagem automática, a empresa se especializa em engates rápidos hidráulicos e pneumáticos. Possui equipamentos de teste completos conforme a ISO 7241-2 e produz também como OEM para marcas internacionais.",
    "A empresa é certificada pelo sistema de gestão da qualidade ISO 9001 e recebeu títulos como Empresa Nacional de Alta Tecnologia, Empresa Confiável de Zhejiang e Centro de Tecnologia Empresarial de Ningbo, além de prêmio de progresso tecnológico, certificação de padrão de segurança de produção de Ningbo e mais de 108 patentes nacionais.",
    "Os produtos Songqiao são aplicados em conexões e terminais de equipamentos mecânicos, proteção contra incêndio, navegação, equipamentos militares, medicina, aviação, metalurgia, indústria química e equipamentos de energia. São 38 filiais de vendas na China e exportação para América, Europa, Oceania e Ásia, em mais de 150 países.",
  ],
  facts: [
    { value: "1983", label: "início das atividades" },
    { value: "300+", label: "equipamentos de produção" },
    { value: "108+", label: "patentes nacionais" },
    { value: "150+", label: "países atendidos" },
  ],
  credentials: ["ISO 9001", "Testes conforme ISO 7241-2", "Empresa Nacional de Alta Tecnologia", "38 filiais de vendas na China"],
} as const;

export interface GalleryPhoto {
  src: string;
  caption: string;
}

/** Fotos da página Produção do site atual (mesma ordem e legendas). */
export const productionPhotos: readonly GalleryPhoto[] = [
  "Fábrica",
  "Amostras",
  "Setor de tecnologia",
  "Oficina CNC",
  "Análise de materiais",
  "Sala de testes",
  "Oficina de tratamento térmico",
  "Teste de produto 1",
  "Sala de aquisição",
  "Teste de produto 2",
  "Teste de produto 3",
  "Teste de produto 4",
].map((caption, index) => ({ caption, src: `/producao/${String(index + 1).padStart(2, "0")}.webp` }));

/**
 * Certificados da página Certificados do site atual (16 imagens, sem legenda na origem).
 * Títulos traduzidos livremente do chinês a partir das próprias imagens — validar com o cliente.
 */
export const certificates: readonly GalleryPhoto[] = [
  "Marca notória de Ningbo (2015–2018)",
  "Empresa Confiável de Zhejiang — 2014",
  "Fábrica Modelo Ambiental (Verde) de Ningbo — 2015",
  "Programa Nacional Tocha — projeto de demonstração industrial",
  "Classificação de crédito AAA para PMEs — 2015",
  "Vice-presidência executiva da Associação de Hidráulica, Pneumática e Vedações de Ningbo — 2017",
  "Certificado de registro ISO 9001",
  "Classificação de crédito AAA para PMEs — 2017",
  "Classificação de crédito AAA para PMEs — 2017 (2ª via)",
  "Empresa AA \"cumpre contratos e honra o crédito\" — Zhejiang",
  "Membro da Associação de Proteção à Propriedade Intelectual de Ningbo",
  "Centro de Engenharia e Tecnologia Pneumática e Hidráulica de Ningbo — 2011",
  "Empresa AAA \"cumpre contratos e honra o crédito\" — Zhejiang, 2009",
  "Empresa Íntegra — Ningbo",
  "Fundo de Inovação Tecnológica para PMEs — projeto aprovado",
  "Empresa de Alta Tecnologia — 2014",
].map((caption, index) => ({ caption, src: `/certificados/${String(index + 1).padStart(2, "0")}.webp` }));
