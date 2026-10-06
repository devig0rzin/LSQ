import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { primaryNavigation } from "@/content/navigation";

export function PublicShell({ children }: { children: ReactNode }) {
  return <><SiteHeader contactHref="/contato" navigation={primaryNavigation} /><main id="conteudo-principal">{children}</main><SiteFooter navigation={primaryNavigation} /></>;
}
