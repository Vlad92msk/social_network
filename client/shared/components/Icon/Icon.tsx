import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { CSSProperties } from 'react'
import { IconName } from '@public/models/icon.model'
import styles from './Icon.module.scss'
import { createIconPath, getIcon } from './utils/loadIcon'
import { makeCn } from '../../utils'

const cn = makeCn('Icon', styles)

export type IconFill = 'oldAsphalt50' | 'oldAsphalt40' | 'bluePrimrose50' | 'light100' | 'redRose40'
export type IconSize = 'small' | 'ordinary' | 'medium' | 'large'
export interface IconBasePath {
  directory: 'users'
  folder: 'hobbies' | 'skills'
}

export interface IconProps {
  basePath?: IconBasePath
  className?: string
  icon: IconName
  fill?: IconFill
  size?: IconSize
  style?: CSSProperties
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  ref?: React.LegacyRef<HTMLOrSVGElement>
}

export const Icon: React.FC<IconProps> = React.forwardRef((props, ref: React.LegacyRef<HTMLOrSVGElement>) => {
  const { icon, className, size, fill, basePath, ...rest } = props

  const DynamicIcon = getIcon(createIconPath(icon, basePath))
  return <DynamicIcon ref={ref} icon={icon} className={classnames(cn({ fill, size }), className)} {...rest} />
})

Icon.defaultProps = {
  size: 'ordinary',
}

export const IconMotion = motion(Icon)
