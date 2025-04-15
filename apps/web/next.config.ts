import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "socio.events",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fthmb.tqn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "taxila.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
