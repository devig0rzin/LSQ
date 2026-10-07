import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import type { Product } from "@/content/catalog";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <Link
      className="product-tile group flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-white text-graphite transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
      href={`/produtos/${product.slug}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[#e9ecee]">
        <Image
          alt={product.name}
          className="object-cover"
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 33vw, 50vw"
          src={product.images[0]}
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-[#e3e6e9] p-4 sm:p-5">
        <p className="text-sm font-bold tracking-[-.01em]">{product.label}</p>
        <h3 className="mt-1 line-clamp-2 text-[.8125rem] leading-5 text-steel sm:text-sm">{product.name}</h3>
        {product.iso && !product.name.includes(product.iso) ? <p className="mt-1 text-xs text-steel">{product.iso}</p> : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[.8125rem] font-semibold text-signal-red">
          Ver produto <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
