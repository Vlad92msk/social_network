import {
  ApolloClient, DataProxy, HttpLink, InMemoryCache, NormalizedCacheObject,
} from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { isEqual, merge } from 'lodash'
import { useMemo } from 'react'
import { CookieEnum } from '@public/models/cookie'
import { LocalStorageEnum } from '@public/models/localStorage'
import { getCookie, storageGet, storageRemove } from '@shared/utils'
import { DEFAULT_LANGUAGE, Language } from 'src/services/language'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = (userLanguage: Language) => new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    headers: { userLanguage },
    uri: `http://${process.env.HOST}:${process.env.PORT}/graphql/`,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
        },
      },
    },
  }),
})

export const initializeApollo = (lang: Language, initialState = null) => {
  // @ts-ignore
  const prevStateLang = apolloClient && apolloClient.link.options?.headers.userLanguage
  /**
   * Если клиент есть и его язык равен тому, что выбрал пользователь - запускаем его
   * если нет - создаем новый клиент с актуальным языком
   */
  const client = (Boolean(apolloClient) && prevStateLang === lang) ? apolloClient : createApolloClient(lang)
  // const client = createApolloClient(lang)

  // Если уже есть данные
  if (initialState) {
    // Получить существующий кеш, загруженный во время выборки данных на стороне клиента
    const existingCache = client.extract()

    // Объединить существующий кеш с данными, переданными из getStaticProps / getServerSideProps
    const data = merge(initialState, existingCache, {
      // объединять массивы, используя равенство объектов (как в наборах)
      arrayMerge: (destinationArray: any, sourceArray: any) => ([
        ...sourceArray,
        ...destinationArray.filter((d: any) => sourceArray.every((s: any) => !isEqual(d, s))),
      ]),
    })

    // Восстановить кеш с объединенными данными
    client.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client

  // Чистит localStorage если пользователь вышел/не авторизирован
  if (!getCookie(CookieEnum.TOKEN)) storageRemove(LocalStorageEnum.CURRENT_USER)

  // Для SSG и SSR всегда создавайте нового клиента Apollo.
  if (!apolloClient) apolloClient = client

  return client
}

type Pops = {
  props: {
    [key: string]: any
  }
}
export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: Pops) => {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  return pageProps
}

export const useApollo = (lang: Language, pageProps: unknown): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(lang, state), [state, lang])
}
export type ApolloStateType = ReturnType<typeof useApollo>

/**
 * @description Получить данные из кэша
 * @param options
 */
export const getCache = (options: DataProxy.ReadQueryOptions<NormalizedCacheObject, unknown>) => {
  const language: Language = storageGet('userLanguage') || DEFAULT_LANGUAGE
  const client = initializeApollo(language)
  return <NormalizedCacheObject>client.cache.readQuery(options)
}
