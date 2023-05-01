import { assign, isEqual, pick } from 'lodash'
import { MutableRefObject, useCallback, useLayoutEffect, useMemo, useRef, useState, } from 'react'


export const useRect = <T extends HTMLElement>(
  ref: MutableRefObject<HTMLElement | null | undefined> | undefined,
  watchProps: Array<keyof DOMRect>, // Массив свойств DOMRect, которые необходимо отслеживать
): Partial<DOMRect> => {
  const [rect, setRect] = useState<Partial<DOMRect>>({})

  // Создаем useRef для ResizeObserver
  const observer = useRef<ResizeObserver>()

  // Создаем useRef, чтобы хранить предыдущее состояние rect и избежать избыточных обновлений
  const prevRectRef = useRef<Partial<DOMRect>>({})

  // Мемоизируем pickProps, чтобы избежать создания нового объекта pickRect при каждом вызове handleResize
  const pickedProps = useMemo(() => watchProps, [watchProps])

  // Функция обратного вызова для ResizeObserver, которая обновляет состояние rect при изменении размера элемента
  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const newRect = entries[0].contentRect
      // Используем функцию pick для выбора только отслеживаемых свойств DOMRect
      const pickRect = pick(newRect, ...pickedProps) as Partial<DOMRect>

      // Проверяем, изменились ли отслеживаемые свойства DOMRect, и обновляем состояние rect, если это так
      if (!isEqual(prevRectRef.current, pickRect)) {
        setRect((prevRect) => {
          prevRectRef.current = pickRect
          return assign(prevRect, pickRect)
        })
      }
    },
    [prevRectRef, pickedProps],
  )

  // Используем useEffect, чтобы начать отслеживание размера элемента при монтировании компонента
  useLayoutEffect(() => {
    // Создаем новый ResizeObserver и передаем функцию обратного вызова handleResize
    observer.current = new ResizeObserver(handleResize)
    // Если ref элемента существует, начинаем отслеживать его размер
    if (ref?.current) {
      observer.current.observe(ref.current)
    }

    return () => observer.current?.disconnect()
  }, [handleResize, ref])

  return rect ?? {}
}
