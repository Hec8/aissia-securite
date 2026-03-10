import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // obligatoire avec output: 'export' (pas d'API /_next/image)
  },
  reactCompiler: true,
};

export default nextConfig;
