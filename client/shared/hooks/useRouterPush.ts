import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { DefaultObject } from '@public/models/defaultObject.model'


export const useReplaceRouterUrl = (oldParam: string, newParam: string): [() => void, string] => {
  const { asPath, push } = useRouter()
  const path = useMemo(() => asPath.replace(oldParam, newParam), [asPath, oldParam, newParam])
  const push1 = useCallback(() => push(path), [path, push])

  return [push1, path]
}

export const useReplaceRouterQuery = (newQuery: DefaultObject, remove?: string[]) => {
  const { query, replace } = useRouter()
  const refQuery = { ...query }

  if (remove) {
    remove.forEach((item) => delete refQuery[item])
  }
  return useCallback(() => replace({ query: { ...refQuery, ...newQuery } }), [replace, refQuery, newQuery])
}
