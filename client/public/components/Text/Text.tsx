import React from 'react'
import { Box } from 'react-polymorphic-box'
import { AS, BoxProps } from '@public/types/boxType'


export interface TextProps {
    uppercase?: boolean
    className?: string
    nowrap?: boolean
    space?: number | string
}


export const DEFAULT_TEXT: AS = 'span'

export const Text = <E extends AS = typeof DEFAULT_TEXT>(props: BoxProps<E, TextProps>) => {
  const { className, uppercase, style, nowrap, space, ...rest } = props

  return (
    <Box
      className={className}
      style={{
        ...style,
        letterSpacing: `${space}em`,
        textTransform: uppercase && 'uppercase',
        whiteSpace: nowrap && 'nowrap',
      }}
      {...rest}
    />
  )
}

// export const TextMotion = motion(forwardRef((props: BoxProps<any, TextOwnProps>, ref: RefType<any>) => (
//   <Text {...props} ref={ref} />
// )))

Text.defaultProps = {
  as: DEFAULT_TEXT,
} as TextProps
