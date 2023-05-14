import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { CSSProperties } from 'react'
import { IconName } from '@public/types/icon.model'
import { RefType } from '@public/types/refType'
import { makeCn } from '@public/utils'
import styles from './Icon.module.scss'
import { createIconPath, getIcon } from './utils/loadIcon'

const cn = makeCn('Icon', styles)

export interface IconBasePath {
  directory: 'users'
  folder: 'hobbies' | 'skills'
}

export interface IconProps {
  basePath?: IconBasePath
  className?: string
  icon: IconName
  name?: string
  style?: CSSProperties
  onClick?: (e) => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  ref?: RefType<HTMLOrSVGElement>
}

export const Icon = React.forwardRef((props: IconProps, ref: RefType<HTMLOrSVGElement>) => {
  const { icon, className, basePath, ...rest } = props

  const DynamicIcon = getIcon(createIconPath(icon, basePath))
  return <DynamicIcon ref={ref} icon={icon} className={classnames(cn(), className)} {...rest} />
})

export const IconMotion = motion(Icon)
