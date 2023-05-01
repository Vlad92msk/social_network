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
}


export const initialState: StateModule = {
  open: false,
  target: undefined,
  xPlacement: 'left',
  arrow: undefined,
  withDefaultArrow: false,
  defaultArrow: <Icon icon="arrow-right-sharp" />,
  popupStyle: undefined,
  arrowHeight: 10,
  margin: 20,
  position: 'left',
  arrowStyle: undefined,
}
