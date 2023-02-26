import { pick } from 'lodash'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useRect = <T extends Element>(param: (keyof DOMRect)[] = [], withScroll = true): [
  Partial<DOMRect>,
  MutableRefObject<T | null>
] => {
  const ref = useRef<T>(null)
  const [rect, setRect] = useState<Partial<DOMRect>>(null)

  const set = useCallback(() => setRect(() => pick(ref.current?.getBoundingClientRect(), param) as Partial<DOMRect>), [param])

  const useEffectInEvent = (
    event: 'resize' | 'scroll',
    useCapture?: boolean,
  ) => {
    useEffect(() => {
      // set()
      window.addEventListener(event, set, useCapture)
      return () => window.removeEventListener(event, set, useCapture)
    }, [event, useCapture])
  }

  useEffectInEvent('resize')
  useEffectInEvent('scroll', withScroll)

  return [rect || {}, ref]
}
