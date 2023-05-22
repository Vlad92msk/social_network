import React from 'react'
import { Box } from 'react-polymorphic-box'
import { AS, BoxProps } from '@public/types/boxType'
import { JSXElementTypeMap } from '@public/types/JSXElementTypeMap'
import { RefType } from '@public/types/refType'


export interface TextProps {
    uppercase?: boolean
    className?: string
    nowrap?: boolean
    space?: number | string
    bold?: boolean | number
}


export const DEFAULT_TEXT: AS = 'span'

export const Text = React.forwardRef(<E extends AS = typeof DEFAULT_TEXT, >(props: BoxProps<E, TextProps>, ref?: RefType<JSXElementTypeMap[E]>) => {
  const {
    className, uppercase, style, nowrap, space, bold, ...rest
  } = props

  return (
    <Box
      className={className}
      style={{
        ...style,
        letterSpacing: `${space}em`,
        textTransform: uppercase && 'uppercase',
        whiteSpace: nowrap && 'nowrap',
        fontWeight: typeof bold === 'boolean' ? 'bold' : bold,
      }}
      ref={ref}
      {...rest}
    />
  )
})

// export const TextMotion = motion(forwardRef((props: BoxProps<any, TextOwnProps>, ref: RefType<any>) => (
//   <Text {...props} ref={ref} />
// )))

Text.defaultProps = {
  as: DEFAULT_TEXT,
} as TextProps
