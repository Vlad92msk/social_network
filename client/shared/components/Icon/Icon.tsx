import { classnames } from '@bem-react/classnames'
import dynamic from 'next/dynamic'
import React, { CSSProperties } from 'react'
import { IconName } from '@public/models/icon.model'
import { makeCn } from '../../utils'
import styles from './Icon.module.scss'

const cn = makeCn('Icon', styles)

export type IconFill = 'oldAsphalt50' | 'oldAsphalt40' | 'bluePrimrose50' | 'light100' | 'redRose40'
export type IconSize = 'small' | 'ordinary' | 'medium' | 'large' | 'small_1'

export interface IconProps {
  basePath?: 'users/hobbies/' | 'users/skills/'
  className?: string
  icon: IconName
  fill?: IconFill
  size?: IconSize
  style?: CSSProperties
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
}

export const Icon: React.FunctionComponent<IconProps> = ({
  className, icon, fill, size, onClick, onMouseEnter, onMouseLeave, style, basePath,
}) => {
  const DynamicComponent = dynamic(() => import(`../../../public/resources/icons/${basePath || 'share/'}${icon}.svg`), {
    ssr: false,
  })

  DynamicComponent.defaultProps = {
    className: classnames(cn({ fill, size }), className),
    onClick,
    onMouseEnter,
    onMouseLeave,
    style,
  }

  return <DynamicComponent />
}
