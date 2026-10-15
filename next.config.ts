import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  devIndicators: false,
  allowedDevOrigins: [
    "192.168.10.100",
    "192.168.10.100:3000",
    "localhost:3000",
  ],
};

export default nextConfig;
