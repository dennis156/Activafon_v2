/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
      turbo: false, // Desactiva TurboPack
  },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Permite cualquier dominio
        },
      ],
    },
    webpack(config, { isServer }) {
      if (!isServer) {
        config.node = {
          ...config.node,
          fs: 'empty',  // Excluye módulos no compatibles como 'fs' y 'child_process'
          child_process: 'empty',
        };
      }
      return config;
    },
};

export default nextConfig;
