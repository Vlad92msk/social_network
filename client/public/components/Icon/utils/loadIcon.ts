import dynamic from 'next/dynamic'
import React from 'react'
import { IconBasePath, IconProps } from '@public/components/Icon'
import { IconName } from '@public/types/icon.model'
import { createString } from '@public/utils'

const imageFiles = require.context('@public/resources/icons')
const loadableIcons = new Map()

imageFiles.keys().forEach((item) => {
  const path = item.replace('./', '/')
  loadableIcons.set(path, dynamic(async () => import(`../../../../public/resources/icons${path}`)))
})

export const getIcon = (path: string): React.FC<IconProps> => loadableIcons.get(path)

export const createIconPath = (icon: IconName, path?: IconBasePath): string => {
  if (path) return createString([path.directory, path.folder, `${icon}.svg`], '/')
  return createString(['share', `${icon}.svg`], '/')
}
