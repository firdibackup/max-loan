import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The public bank catalog is served by a server-only Supabase proxy.
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
