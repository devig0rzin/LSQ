import type { NavigationItem } from "@/types/content";

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Produtos", href: "/produtos" },
  { label: "Empresa", href: "/empresa" },
  { label: "Fábrica 360", href: "/fabrica" },
  { label: "Contato", href: "/contato" },
];

export const previewNavigation: readonly NavigationItem[] = [
  { label: "Fundação", href: "#fundacao" },
  { label: "Componentes", href: "#componentes" },
  { label: "Produto", href: "#produto" },
  { label: "Composições", href: "#composicoes" },
];
