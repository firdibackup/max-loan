import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set NEXT_PUBLIC_BASE_PATH=/maxloan in prod to mount under remax.co.id/maxloan.
  // Leave unset for local dev and for this app's own preview/production domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
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
