import { pick } from 'lodash'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useRect = <T extends Element>(param: (keyof DOMRect)[] = [], withScroll = true): [
  Partial<DOMRect>,
  MutableRefObject<T | null>
] => {
  const ref = useRef<T>(null)
  const [rect, setRect] = useState<Partial<DOMRect>>({})
  const set = useCallback(() => {
    if (ref.current) {
      const newRect = pick(
        ref.current.getBoundingClientRect(),
        ...(param || []),
      ) as Partial<DOMRect>
      setRect((prevRect) => ({ ...prevRect, ...newRect }))
    }
  }, [param])

  useEffect(() => {
    window.addEventListener('resize', set)
    window.addEventListener('scroll', set)
    return () => {
      window.removeEventListener('resize', set)
      window.removeEventListener('scroll', set)
    }
  }, [set])

  return [rect || {}, ref]
}


// import { pick } from 'lodash'
// import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
//
// type PickableDOMRectProps = keyof DOMRect;
//
// export const useRect = <T extends Element>(
//     pickProps: PickableDOMRectProps[],
//     withScroll = true,
//     callback?: (rect: Partial<DOMRect>) => void,
// ): [Partial<DOMRect>, MutableRefObject<T | null>] => {
//   const ref = useRef<T>(null)
//   const [rect, setRect] = useState<Partial<DOMRect>>({})
//
//   const set = useCallback(() => {
//     if (ref.current) {
//       const newRect = pick(ref.current.getBoundingClientRect(), ...(pickProps || [])) as Partial<DOMRect>
//       setRect((prevRect) => {
//         if (callback) {
//           callback(newRect)
//         }
//         return { ...prevRect, ...newRect }
//       })
//     }
//   }, [pickProps, callback])
//
//   useEffect(() => {
//     set()
//   }, [set])
//
//   const useEffectInEvent = useCallback(
//       (event: 'resize' | 'scroll', useCapture?: boolean) => {
//         useEffect(() => {
//           window.addEventListener(event, set, useCapture)
//           return () => {
//             window.removeEventListener(event, set, useCapture)
//           }
//         }, [event, useCapture])
//       },
//       [set],
//   )
//
//   useEffectInEvent('resize')
//   useEffectInEvent('scroll', withScroll)
//
//   return [rect || {}, ref]
// }
