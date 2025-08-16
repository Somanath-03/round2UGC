import type { NextConfig } from "next";
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: envUrl,
        port: '',
      },
    ],
  },
};

export default nextConfig;
