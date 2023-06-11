// Импортируем необходимые функции и типы из Apollo Client
import { ApolloClient, createHttpLink, DataProxy, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import { CookieEnum } from '@public/types/cookie'
import { LocalStorageEnum } from '@public/types/localStorage'
import { getCookie, getCookies, storageRemove } from '@public/utils'


export const createApolloClient = () => {
  // Создаём HttpLink для подключения к серверу GraphQL
  const httpLink = createHttpLink({
    uri: `http://${process.env.HOST}:${process.env.PORT}/graphql/`,
  })

  // Устанавливаем заголовки авторизации с помощью setContext
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: getCookies(document.cookie).token, // Извлекаем токен из кук и добавляем его в заголовки
    },
  }))

  // Обрабатываем ошибки с помощью onError
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  // Объединяем errorLink, authLink и httpLink в одно звено
  const link = errorLink.concat(authLink).concat(httpLink)

  // Создаём Apollo Client с указанным звеном и кэшем InMemoryCache
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}

// Функция для глубокого объединения двух объектов кэша, удаляя дубликаты
const mergeCaches = (sourceCache: NormalizedCacheObject, destinationCache: NormalizedCacheObject): NormalizedCacheObject => merge(sourceCache, destinationCache, {
  arrayMerge: (destinationArray, sourceArray) => [
    ...sourceArray,
    ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
  ],
})

// Опциональное использование AsyncLocalStorage
// для выполнения множественных параллельных запросов на сервере
const useAsyncLocalStorage = true

// Проверяем, есть ли AsyncLocalStorage
// это внутренний метод NExtjs и не предоставлялся для использования разработчиками
// используем пока есть возможнотсь
const asyncStorage = useAsyncLocalStorage && typeof window === 'undefined'
// eslint-disable-next-line @typescript-eslint/no-var-requires
  ? require('next/dist/client/components/request-async-storage').requestAsyncStorage
  : {}

export const getRequestStorage = (): { apolloState?: NormalizedCacheObject } => {
  if ('getStore' in asyncStorage) return asyncStorage.getStore() ?? {}

  return asyncStorage
}

// Определяем переменную для хранения экземпляра ApolloClient
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

// Функция для инициализации ApolloClient, используя опциональное начальное состояние
export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  // Если уже существует экземпляр ApolloClient, используем его, иначе создаём новый
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    // Если передано начальное состояние, объединяем его с существующим кэшем
    const existingCache = _apolloClient.extract()
    const data = mergeCaches(initialState, existingCache)
    _apolloClient.cache.restore(data)
  }

  // Если мы находимся в серверном окружении, просто возвращаем созданный экземпляр ApolloClient
  if (typeof window === 'undefined') {
    if (useAsyncLocalStorage) {
      const originalQuery = _apolloClient.query
      _apolloClient.query = async (...args) => {
        const result = await originalQuery.apply(_apolloClient, args)
        const currentCache = _apolloClient.cache.extract()
        getRequestStorage().apolloState = mergeCaches(getRequestStorage().apolloState ?? {}, currentCache)
        return result
      }
    }

    return _apolloClient
  }

  // Чистит localStorage если пользователь вышел/не авторизирован
  if (!getCookie(CookieEnum.TOKEN)) storageRemove(LocalStorageEnum.CURRENT_USER)

  // Если ApolloClient ещё не был создан, сохраняем наш созданный экземпляр для дальнейшего использования
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

// Функция для извлечения определённого запроса из кэша ApolloClient
export const getCache = (options: DataProxy.ReadQueryOptions<NormalizedCacheObject, unknown>): NormalizedCacheObject | null => {
  try {
    // Извлекаем запрос из кэша ApolloClient
    return initializeApollo().cache.readQuery(options)
  } catch (error) {
    // Если произошла ошибка, логируем её и возвращаем null
    console.error('Failed to get cache', error)
    return null
  }
}
