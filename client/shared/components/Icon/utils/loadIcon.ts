import dynamic from 'next/dynamic'
import React from 'react'
import { IconName } from '@public/models/icon.model'
import { IconBasePath, IconProps } from '@shared/components/Icon'
import { createString } from '@shared/utils'

const imageFiles: __WebpackModuleApi.RequireContext = require.context('@public/resources/icons')
const loadableIcons = new Map()

imageFiles.keys().forEach((item) => {
  const path = item.replace('./', '/')
  loadableIcons.set(path, dynamic(async () => import(`../../../../public/resources/icons${path}`)))
})

export const getIcon = (path: string): React.FC<IconProps> => loadableIcons.get(path)


export const createIconPath = (icon: IconName, path?: IconBasePath) => {
  if (path) return createString([path.directory, path.folder, `${icon}.svg`], '/')
  return createString(['share', `${icon}.svg`], '/')
}
