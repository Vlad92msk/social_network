// const Dotenv = require('dotenv-webpack')
// require('dotenv').config({ path: '../.env' })

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);



/** @type {import('next').NextConfig} */
module.exports = withNextIntl(((phase) => {
  // при запуске в режиме разработки `next dev` или `npm run dev` независимо от значения переменной среды STAGING
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // когда используется «следующая сборка» или «npm run build
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // когда используется «следующая сборка» или «npm run build»
  const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    // PORT: process.env.API_PORT,
    // HOST: process.env.API_HOST,
    PORT: (() => {
      if (isDev) return '3000'
      if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    HOST: (() => {
      if (isDev) return 'localhost'
      if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
      // if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    APPLE_ID: 'APPLE_ID',
    APPLE_SECRET: 'APPLE_SECRET',
    GOOGLE_ID: '232906585557-9k9ckn13pgdvovf4p2fn73amkqe25m7a.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    NEXTAUTH_SECRET: 'ptnvr',
    NEXTAUTH_URL: 'http://localhost:3000'
  }

  return {
    env,
    webpack(config) {
      // config.plugins.push(new Dotenv({ silent: true }));

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
    // reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    images: {
      // Указываем домены с которых можно получать картинок с внешних сервисов
      domains: ['lh3.googleusercontent.com'],
    }
    // async redirects() {
    //   return [
    //     {
    //       source: '/',
    //       destination: '/ru/1',
    //       permanent: true,
    //     },
    //   ]
    // },
  }
})())
