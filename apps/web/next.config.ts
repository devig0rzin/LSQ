import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // "Fábrica 360" virou "Produção" (mesmo nome do site atual da LSQ).
    return [{ source: "/fabrica", destination: "/producao", permanent: true }];
  },
};

export default nextConfig;
