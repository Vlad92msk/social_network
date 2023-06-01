import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * создает новую строку с измененными параметрами search
 */
export const newUrlParams = (searchParams: ReadonlyURLSearchParams, name: string, value: any) => {
  const params = new URLSearchParams(searchParams)
  params.set(name, String(value))

  return params.toString()
}

/**
 * Меняет search параметры в url
 */
export const useSetSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback((name: string, value: any) => {
    router.push(`${pathname}?${newUrlParams(searchParams, name, value)}`)
  }, [pathname, router, searchParams])
}
