import type { NextConfig } from "next";
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = envUrl ? new URL(envUrl).hostname : "";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
        port: '',
      },
    ],
  },
};

export default nextConfig;
