/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
      turbo: true, // Desactiva TurboPack
  },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Permite cualquier dominio
        },
      ],
    },
};

export default nextConfig;
