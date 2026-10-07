import Image from "next/image";
import type { MediaAsset } from "@/content/site";

interface MediaImageProps {
  asset: MediaAsset;
  sizes: string;
  className?: string;
  eager?: boolean;
  /** Esconde a legenda "Imagem ilustrativa" quando o contexto já a mostra. */
  hideTag?: boolean;
}

/** Imagem de ambientação em modo `fill`. O pai precisa ser `relative` e ter altura. */
export function MediaImage({ asset, sizes, className = "", eager = false, hideTag = false }: MediaImageProps) {
  return (
    <>
      <Image
        alt={asset.alt}
        className={`object-cover ${className}`}
        fetchPriority={eager ? "high" : undefined}
        fill
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        src={asset.src}
      />
      {asset.illustrative && !hideTag ? <span className="illustrative-tag">Imagem ilustrativa</span> : null}
    </>
  );
}
