import {
  ApolloClient,
  ApolloQueryResult, DataProxy,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client'
import { concatPagination, relayStylePagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'
import { getCookies } from '@public/utils'
import { getRequestStorage } from './localStorage'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: `http://${process.env.HOST}:${process.env.PORT}/graphql/`,
    // credentials: 'include', // Дополнительные параметры fetch(), такие как «учетные данные» или «заголовки»
    headers:
        typeof window === 'undefined' ? {} : {
          authorization: getCookies(document.cookie).token,
        },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination(),
        },
      },
    },
  }),
})

export const mergeCaches = (
  sourceCache: NormalizedCacheObject,
  destinationCache: NormalizedCacheObject,
): NormalizedCacheObject =>
  // Объедините существующий кеш с данными, переданными из getStaticProps/getServerSideProps.
  // eslint-disable-next-line implicit-arrow-linebreak
  merge(sourceCache, destinationCache, {
    // объединять массивы, используя равенство объектов (например, в наборах)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
    ],
  })


export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // Если уже есть данные
  if (initialState) {
    // Получить существующий кеш
    const existingCache = _apolloClient.extract()
    const data = mergeCaches(initialState, existingCache)

    // Восстановить кеш с объединенными данными
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined' && !apolloClient) {
    // Переопределить метод запроса apolloClient для сохранения кеша в хранилище запросов
    const originalQuery = _apolloClient.query
    _apolloClient.query = async function <
      T = unknown,
      TVariables = OperationVariables
    > (options: QueryOptions<TVariables, T>): Promise<ApolloQueryResult<T>> {
      const r = await originalQuery.apply(originalQuery, [options])
      const currentCache = _apolloClient.cache.extract()
      // Поместите кеш в локальное хранилище для этого запроса
      getRequestStorage().apolloState = mergeCaches(
        getRequestStorage().apolloState ?? {},
        currentCache,
      )
      return r as ApolloQueryResult<T>
    }
    return _apolloClient
  }
  // Создайте клиент Apollo один раз в клиенте
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}


export const useApollo = (state: NormalizedCacheObject) => (
  useMemo(() => initializeApollo(state), [state])
)


export const getCache = (options: DataProxy.ReadQueryOptions<NormalizedCacheObject, unknown>) => (
  <NormalizedCacheObject>initializeApollo().cache.readQuery(options)
)
