// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.runfission.com',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/webhook",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS,POST" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-blocken-signature" },
        ]
      }
    ]
  }
}
