import { CSSProperties } from 'react'
import { rem } from '@shared/utils'
import { PopupPosition } from '../context/initialState'


export function calculatePopupPosition(
  position: PopupPosition,
  { width, height }: Pick<DOMRect, 'width' | 'height'>,
  margin = 0,
  arrowHeight = 0,
): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
  }

  if (!position) return style
  const [direction, modifier] = position.split('-')
  const isEndPosition = modifier === 'end'
  const isStartPosition = modifier === 'start'
  const isCenterPosition = !modifier

  switch (direction) {
    case 'left':
      style.right = rem(width + margin + arrowHeight)
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
      break
    case 'right':
      style.left = rem(width + margin + arrowHeight)
      style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.bottom = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
      break
    case 'top':
      style.bottom = `calc(100% + ${rem(margin + arrowHeight)})`
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
      break
    case 'bottom':
      style.top = rem(height + margin + arrowHeight)
      style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
      style.right = isEndPosition ? 0 : undefined
      style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
      break
    default:
      break
  }

  return style
}
