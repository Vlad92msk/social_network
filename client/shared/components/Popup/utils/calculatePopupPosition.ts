import { CSSProperties } from 'react'
import { rem } from '@shared/utils'
import { StateModule } from '../context/initialState'


export function calculatePopupPosition(
  position: StateModule['position'],
  { width, height }: Pick<DOMRect, 'width' | 'height'>,
  margin: StateModule['margin'],
  arrowHeight: StateModule['arrowHeight'],
  behavior: StateModule['behavior'],
  x = 0,
  y = 0,
): CSSProperties {
  const style: CSSProperties = {
    position: behavior,
  }

  if (!position) return style
  const [direction, modifier] = position.split('-')
  const isEndPosition = modifier === 'end'
  const isStartPosition = modifier === 'start'
  const isCenterPosition = !modifier

  if (behavior === 'absolute') {
    switch (direction) {
      case 'left':
        style.right = rem(width + margin! + arrowHeight!)
        style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
        style.bottom = isEndPosition ? 0 : undefined
        style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
        break
      case 'right':
        style.left = rem(width + margin! + arrowHeight!)
        style.top = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
        style.bottom = isEndPosition ? 0 : undefined
        style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
        break
      case 'top':
        style.bottom = `calc(100% + ${rem(margin! + arrowHeight!)})`
        style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
        style.right = isEndPosition ? 0 : undefined
        style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
        break
      case 'bottom':
        style.top = rem(height + margin! + arrowHeight!)
        style.left = isCenterPosition ? '50%' : isStartPosition ? '0' : undefined
        style.right = isEndPosition ? 0 : undefined
        style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
        break
      default:
        break
    }
  } else {
    switch (direction) {
      case 'left':
        style.right = `calc(100% - ${x - (margin! + arrowHeight!)}px)`
        style.top = y
        style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
        break
      case 'right':
        style.left = x + margin! + arrowHeight!
        style.top = y
        style.transform = isCenterPosition ? 'translate(0, -50%)' : undefined
        break
      case 'top':
        style.bottom = `calc(100% - ${y - (margin! + arrowHeight!)}px)`
        style.left = x
        style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
        break
      case 'bottom':
        style.top = y + margin! + arrowHeight!
        style.left = x
        style.transform = isCenterPosition ? 'translate(-50%, 0)' : undefined
        break
      default:
        break
    }
  }

  return style
}
