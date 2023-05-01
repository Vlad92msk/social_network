import { CSSProperties } from 'react'
import { PopupPosition } from '../context/initialState'


export function calculateArrowPosition(
  position: PopupPosition,
  { width, height }: Pick<DOMRect, 'width' | 'height'>,
  margin = 0,
  arrowHeight = 0,
): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    height: `${arrowHeight}px`,
    width: `${arrowHeight}px`,
  }

  if (!position) return style
  const [direction, modifier] = position.split('-')
  const isEndPosition = modifier === 'end'
  const isStartPosition = modifier === 'start'
  const isCenterPosition = !modifier

  switch (direction) {
    case 'left':
      style.right = width + margin
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%) rotate(0deg)' : 'rotate(0deg)'
      break
    case 'right':
      style.left = width + margin
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%) rotate(180deg)' : 'rotate(180deg)'
      break
    case 'top':
      style.bottom = `calc(100% + ${margin}px)`
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0) rotate(90deg)' : 'rotate(90deg)'
      break
    case 'bottom':
      style.top = height + margin
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0) rotate(-90deg)' : 'rotate(-90deg)'
      break
    default:
      break
  }

  return style
}
