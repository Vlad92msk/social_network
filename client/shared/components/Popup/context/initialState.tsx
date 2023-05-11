import React, { CSSProperties } from 'react'
import { Icon } from '@shared/components/Icon'
import { UsePortalProps } from '../../Portal/usePortal'

export type PopupPosition = | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'

export interface StateModule {
  open?: boolean
  target: UsePortalProps['targetEl']
  xPlacement?: PopupPosition
  arrow?: React.ReactElement
  withDefaultArrow?: boolean
  defaultArrow?: React.ReactElement
  position?: PopupPosition
  margin?: number
  arrowHeight?: number
  popupStyle?: CSSProperties
  arrowStyle?: CSSProperties
  whileAction?: 'click' | 'hover'
  behavior?: 'fixed' | 'absolute'
  isClickOutside?: boolean
}


export const initialState: StateModule = {
  open: false,
  target: undefined,
  xPlacement: undefined,
  arrow: undefined,
  withDefaultArrow: false,
  defaultArrow: <Icon icon="arrow-right-sharp" />,
  popupStyle: undefined,
  arrowHeight: 10,
  margin: 0,
  position: 'top',
  arrowStyle: undefined,
  whileAction: 'click',
  isClickOutside: false,
  behavior: 'absolute',
}
