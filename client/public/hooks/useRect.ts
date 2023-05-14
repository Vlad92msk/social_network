import { isEqual, pick } from 'lodash'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { AS } from '@public/types/boxType'
import { JSXElementTypeMap } from '@public/types/JSXElementTypeMap'

export const useRect = <T extends AS>(
  ref: RefObject<JSXElementTypeMap[T]>,
  watchProps: Array<keyof DOMRect>, // Массив свойств DOMRect, которые необходимо отслеживать
): Partial<DOMRect> => {
  const [rect, setRect] = useState<Partial<DOMRect>>({})

  // Создаем useRef для ResizeObserver
  const observer = useRef<ResizeObserver>()

  // Создаем useRef, чтобы хранить предыдущее состояние rect и избежать избыточных обновлений
  const prevRectRef = useRef<Partial<DOMRect>>({})

  // Функция обратного вызова для ResizeObserver, которая обновляет состояние rect при изменении размера элемента
  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const newRect = entries[0].contentRect
      // Используем функцию pick для выбора только отслеживаемых свойств DOMRect
      const pickRect = pick(newRect, ...watchProps) as Partial<DOMRect>

      // Проверяем, изменились ли отслеживаемые свойства DOMRect, и обновляем состояние rect, если это так
      if (!isEqual(prevRectRef.current, pickRect)) {
        setRect((prevRect) => {
          prevRectRef.current = pickRect
          return { ...prevRect, ...pickRect }
        })
      }
    },
    [prevRectRef, watchProps],
  )

  // Используем useEffect, чтобы начать отслеживание размера элемента при монтировании компонента
  useEffect(() => {
    // Создаем новый ResizeObserver и передаем функцию обратного вызова handleResize
    observer.current = new ResizeObserver(handleResize)
    // Если ref элемента существует, начинаем отслеживать его размер
    if (ref?.current) {
      // @ts-ignore
      observer.current.observe(ref.current)
    }

    return () => observer.current?.disconnect()
  }, [observer, handleResize, ref])

  return rect ?? {}
}
