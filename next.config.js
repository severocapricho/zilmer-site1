/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Desabilitado para desenvolvimento (habilite apenas para build de produção)
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

