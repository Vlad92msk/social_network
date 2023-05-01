import { initialState, PopupPosition } from '../context/initialState'

export const getXPlacement = (position?: PopupPosition) => {
  if (!position) return initialState.position

  if (position.startsWith('right')) return 'right'
  if (position.startsWith('left')) return 'left'
  if (position.startsWith('top')) return 'top'
  if (position.startsWith('bottom')) return 'bottom'
  return initialState.position
}