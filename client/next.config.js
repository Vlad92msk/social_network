const Dotenv = require('dotenv-webpack')
require('dotenv').config({ path: '../.env' })

module.exports = {
  webpack(config) {
    config.plugins.push(new Dotenv({ silent: true }));

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    PORT: process.env.API_PORT,
    HOST: process.env.API_HOST,
  },
  reactStrictMode: true,
}
