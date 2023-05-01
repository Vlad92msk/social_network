import { motion } from 'framer-motion'
import React, { forwardRef, PropsWithChildren } from 'react'
import { Box } from 'react-polymorphic-box'
import { AS, BoxProps } from '@public/models/boxType'
import { PortalOptions, usePortal, UsePortalProps } from './usePortal'

const DEFAULT_POPPER_ELEMENT: AS = 'div'

export interface PortalProps extends PropsWithChildren {
    open: boolean
    targetEl?: UsePortalProps['targetEl']
    options?: PortalOptions
    className?: string
}


export const Portal = forwardRef(<E extends AS>(
  props: BoxProps<E, PortalProps>,
  ref?: React.Ref<HTMLElement>,
) => {
  const { open, targetEl, options, children, ...rest } = props

  return usePortal({
    open,
    targetEl,
    options,
    children: (
      <Box ref={ref} {...rest}>
        {children}
      </Box>
    ),
  })
})

Portal.defaultProps = {
  as: DEFAULT_POPPER_ELEMENT,
}

export const MotionPopper = motion(Portal)
