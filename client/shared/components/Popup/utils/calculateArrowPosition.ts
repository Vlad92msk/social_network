import { CSSProperties } from 'react'
import { rem } from '@shared/utils'
import { PopupPosition } from '../context/initialState'


export function calculateArrowPosition(
  position: PopupPosition,
  { width, height }: Pick<DOMRect, 'width' | 'height'>,
  margin = 0,
  arrowHeight = 0,
): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    height: rem(arrowHeight),
    width: rem(arrowHeight),
  }

  if (!position) return style
  const [direction, modifier] = position.split('-')
  const isEndPosition = modifier === 'end'
  const isStartPosition = modifier === 'start'
  const isCenterPosition = !modifier

  switch (direction) {
    case 'left':
      style.right = rem(width + margin)
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%) rotate(0deg)' : 'rotate(0deg)'
      break
    case 'right':
      style.left = rem(width + margin)
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%) rotate(180deg)' : 'rotate(180deg)'
      break
    case 'top':
      style.bottom = `calc(100% + ${rem(String(margin))})`
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0) rotate(90deg)' : 'rotate(90deg)'
      break
    case 'bottom':
      style.top = rem(height + margin)
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0) rotate(-90deg)' : 'rotate(-90deg)'
      break
    default:
      break
  }

  return style
}
