/** @type {import('next').NextConfig} */
const nextConfig = {
  // O Next.js e a Vercel já gerem as configurações de output e distDir automaticamente.
  // Manter apenas o essencial é a melhor prática para o deploy.

  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false // Vamos manter isto para garantir a qualidade do código
  },
  images: { unoptimized: true }
}

module.exports = nextConfig
