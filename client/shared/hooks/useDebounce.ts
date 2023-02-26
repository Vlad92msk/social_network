import { useCallback, useRef } from 'react'

export const useDebounce = <T, A extends any[]>(fn: (...args: A) => T, delay: number) => {
  const timeout = useRef<NodeJS.Timeout>(null)

  return useCallback((...args: A) => {
    window.clearTimeout(timeout.current)
    timeout.current = setTimeout(() => fn(...args), delay)
  }, [delay, fn])
}
