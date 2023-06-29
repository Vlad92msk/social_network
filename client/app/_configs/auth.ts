import { cookies } from 'next/headers'
import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { fetcher } from '@public/utils/fetcher'
import { allUsers } from '../api/user/allUsers'
// import AppleProvider from 'next-auth/providers/apple'
// import EmailProvider from 'next-auth/providers/email'
// import FacebookProvider from 'next-auth/providers/facebook'


export const authConfig: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
  // это асинхронные функции, которые не возвращают ответ, они полезны для ведения журнала аудита.
  events: {
    // async signIn(message) { console.log('зашел', message) },
    // async signOut(message) {},
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
  },
  callbacks: {
    async session({ session, token, user }) {
      /**
       * TODO: временно пока не будет реального метода
       */
      // @ts-ignore
      const findUser = allUsers.find(({ id }) => id === '1')
      // const findUser = await fetcher(`http://localhost:3000/api/user/${uuid}`)
      session.user = { ...findUser, ...session.user }

      return session
    },
    async signIn({ user, account, profile }) {
      // console.log('signIn')
      // Получение токена доступа
      // console.log('user', user)
      // console.log('profile', profile)
      // const accessToken = account?.accessToken
      // console.log('account:', account)
      // console.log('Access Token:', accessToken)

      // Здесь наверно будет метод сохранения авторизационных данных на бэке
      // тоесть будет метод signIn
      // но так как авторизация подтверждена сторонными сервисами - ее просто сохраняем в базе
      // const findUser = await fetcher('http://localhost:3000/api/user/1')

      // Возвращаем true для продолжения авторизации
      return true
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),
  ],
}
