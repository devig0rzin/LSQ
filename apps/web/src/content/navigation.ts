import type { NavigationItem } from "@/types/content";

/** Mesmas seções do site atual da LSQ; o tour 360° fica dentro de Produção e na faixa do topo. */
export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Produtos", href: "/produtos" },
  { label: "Empresa", href: "/empresa" },
  { label: "Produção", href: "/producao" },
  { label: "Certificados", href: "/certificados" },
  { label: "Calculadora", href: "/calculadora" },
  { label: "Contato", href: "/contato" },
];

export const previewNavigation: readonly NavigationItem[] = [
  { label: "Fundação", href: "#fundacao" },
  { label: "Componentes", href: "#componentes" },
  { label: "Produto", href: "#produto" },
  { label: "Composições", href: "#composicoes" },
];
