import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so a stray lockfile in the home dir isn't inferred.
  turbopack: { root: __dirname },
};

export default nextConfig;
