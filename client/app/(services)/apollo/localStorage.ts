/**
 * Этот файл гарантирует, что мы можем получить хранилище, уникальное для текущего контекста запроса.
 */
import { AsyncLocalStorage } from 'async_hooks'
import { NormalizedCacheObject } from '@apollo/client'

// https://github.com/vercel/next.js/blob/canary/packages/next/client/components/request-async-storage.ts
export const asyncStorage:
  | AsyncLocalStorage<{ apolloState?: NormalizedCacheObject }>
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-var-requires,global-require
  | {} = require('next/dist/client/components/request-async-storage').requestAsyncStorage

export const getRequestStorage = (): { apolloState?: NormalizedCacheObject } => {
  if ('getStore' in asyncStorage) return asyncStorage.getStore() ?? {}

  return asyncStorage
}
