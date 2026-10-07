import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = { title: { default: "LSQ XH | Conexões para fluidos", template: "%s | LSQ XH" }, description: "Catálogo técnico e atendimento comercial LSQ XH." };
export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>{children}</body></html>; }
