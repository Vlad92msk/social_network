import { classnames } from '@bem-react/classnames'
import React from 'react'
import { DEFAULT_TEXT, Text as TextBase, TextProps } from '@public/components/Text'
import { AS, BoxProps } from '@public/types/boxType'
import { makeCn, classNames } from '@public/utils'
import styles from './Text.module.scss'
import { MEDIA } from '../../../src/data/media'

const cn = makeCn('Text', styles)

export type TextSize = (
    '80'
    | '54'
    | '44'
    | '38'
    | '34'
    | '30'
    | '25'
    | '28'
    | '22'
    | '20'
    | '18'
    | '16'
    | '14'
    | '12'
    | '10'
    | '8'
);


export type TextAdaptive = {
    [key in keyof typeof MEDIA]: TextSize
};

export interface TextOwnProps extends TextProps {
    size?: TextSize
    adaptive?: Partial<TextAdaptive>
    ellipsis?: boolean
}

export const Text = React.forwardRef(<E extends AS = typeof DEFAULT_TEXT, >(props: BoxProps<E, TextOwnProps>, ref?) => {
  const { className, size, adaptive, ellipsis, ...rest } = props

  return (
    <TextBase
      className={classnames(cn({ size, ellipsis, ...adaptive }), className)}
      ref={ref}
      {...rest}
    />
  )
})


Text.defaultProps = {
  size: '16',
} as TextOwnProps
