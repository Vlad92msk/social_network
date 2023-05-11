import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { Box } from 'react-polymorphic-box'
import { BoxProps } from '@public/models/boxType'
import { initialState, StateModule } from './context/initialState'
import { usePopupSelect, usePopupUpdate } from './Popup'
import { PopupArrow } from './PopupArrow'
import { cn } from './PopupComponent'
import { calculateArrowPosition } from './utils/calculateArrowPosition'
import { calculatePopupPosition } from './utils/calculatePopupPosition'
import { getXPlacement } from './utils/getXPlacement'


export const resetValue: Partial<StateModule> = {
  target: undefined,
  popupStyle: undefined,
  arrowStyle: undefined,
  open: false,
  xPlacement: initialState.xPlacement,
}

export type PopupButtonProps = PropsWithChildren

export const PopupButton = (props: BoxProps<'div', PopupButtonProps>) => {
  const { children, className, onClick, ...rest } = props
  const target = useRef<HTMLDivElement>(null)

  const update = usePopupUpdate()
  const open = usePopupSelect((store) => store.open)
  const whileAction = usePopupSelect((store) => store.whileAction)


  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (!open) {
      const current = e.target as HTMLDivElement

      const { height, width } = current.getBoundingClientRect()
      update((context) => ({
        target,
        open: !context.open,
        xPlacement: getXPlacement(context.position),
        popupStyle: calculatePopupPosition(
              context.position!,
              { height, width },
              context.margin,
              context.arrowHeight,
              context.behavior,
              e.clientX,
              e.clientY,
        ),
        arrowStyle: calculateArrowPosition(
              context.position!,
              { height, width },
              context.margin,
              context.arrowHeight,
              context.behavior,
              e.clientX,
              e.clientY,
        ),
      }))
    } else {
      update(() => resetValue)
    }
    onClick?.(e)
  }, [onClick, open, update])

  const handleLeave = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    update(() => resetValue)
  }, [update])

  return (
    <Box
      ref={target}
      className={classnames(cn('Button'), className)}
      onClick={whileAction === 'click' ? handleClick : undefined}
      onMouseEnter={whileAction === 'hover' ? handleClick : undefined}
      onMouseLeave={whileAction === 'hover' ? handleLeave : undefined}
      {...rest}
    >
      {children}
      {open && (<PopupArrow />)}
    </Box>
  )
}
