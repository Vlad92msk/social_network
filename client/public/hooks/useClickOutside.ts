import { useEffect } from 'react'
import { Callback } from '@public/types/callback'
import { RefType } from '@public/types/refType'

/**
 * Клик во вне компонента
 * @param ref - вне какого компонента должен быть клик
 * @param callback - что вызываем
 * @param completes - boolean статусы которые все должны быть true чтобы вызвался callback
 */
export const useClickOutside = (ref: RefType, callback: Callback, completes: (boolean | undefined)[]) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (completes.every(Boolean)) {
      const listener = (event) => {
        if (!ref?.current || ref.current.contains(event.target)) return
        callback()
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }
  }, [ref, completes, callback])
}
