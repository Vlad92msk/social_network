import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { Box } from 'react-polymorphic-box'
import { BoxProps } from '@public/models/boxType'
import { usePopupSelect, usePopupUpdate } from './Popup'
import { PopupArrow } from './PopupArrow'
import { cn } from './PopupComponent'
import { calculateArrowPosition } from './utils/calculateArrowPosition'
import { calculatePopupPosition } from './utils/calculatePopupPosition'
import { getXPlacement } from './utils/getXPlacement'


export type PopupButtonProps = PropsWithChildren

export const PopupButton = (props: BoxProps<'div', PopupButtonProps>) => {
  const { children, className, onClick, ...rest } = props
  const target = useRef<HTMLDivElement>(null)

  const update = usePopupUpdate()
  const open = usePopupSelect((store) => store.open)


  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const current = e.target as HTMLDivElement

    const { height, width } = current.getBoundingClientRect()
    update((context) => ({
      ...context,
      target,
      open: !context.open,
      xPlacement: getXPlacement(context.position),
      popupStyle: calculatePopupPosition(
        context.position!,
        { height, width },
        context.margin,
        context.arrowHeight,
      ),
      arrowStyle: calculateArrowPosition(
          context.position!,
          { height, width },
          context.margin,
          context.arrowHeight,
      ),
    }))
    onClick?.(e)
  }, [onClick, update])

  return (
    <Box
      ref={target}
      className={classnames(cn('Button'), className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
      {open && (<PopupArrow />)}
    </Box>
  )
}
