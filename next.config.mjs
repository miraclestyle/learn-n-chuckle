/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'msfpfmwdawonueqaevru.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/img/**',
      },
    ],
  },
}

export default nextConfig
