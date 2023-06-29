'use client'

import React, { useMemo } from 'react'
import { Section, Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { Flex } from '@public/components/Flex'
import { Icon } from '@public/components/Icon'
import { IconButton } from '@public/components/IconButton'
import { useBooleanState, useGetAccentImageColor } from '@public/hooks'
import { classNames, createString, makeCn } from '@public/utils'
import styles from './Photo.module.scss'
import { PHOTOS } from '../../../../../src/data/mockPhotos'
import { AlbumType } from '../../../../_modules/Main/types/album'
import { MediaItem } from './index'


const cn = makeCn('Album', styles)

interface SectionContainerProps {
  album: AlbumType
  className?: string
  elementsCount?: number
  containerWidth?: number
}

export const Album: React.FC<SectionContainerProps> = (props) => {
  const {
    elementsCount, containerWidth, className, album,
  } = props
  const { title, description, bcg, id, elements } = album
  const src = `/resources/images${createString(['users', 'photo', bcg], '/')}`
  const [background, hex, color] = useGetAccentImageColor(`${src}.webp`, 0.4)

  const [isOpen, openAlbum, closeAlbum] = useBooleanState(true)

  const currentMedia = useMemo(() => (
    PHOTOS.filter(({ id: photoId }) => elements.includes(photoId))
  ), [elements])

  return isOpen ? (
    <Section
      className={classNames(cn(), className)}
      style={{ height: containerWidth && `clamp(200px, calc(${containerWidth / 3 + 50}px), 380px)` }}
      bcgImg={{
        path: {
          moduleName: 'users',
          folder: 'photo',
          img: bcg,
        },
      }}
    >
      <div className={cn('Preview')} style={{ background }}>
        <Text style={{ color }}>{title}</Text>
        <Text style={{ color }}>{description}</Text>
        <ButtonBox
          className={cn('ButtonOpen')}
          style={{ background }}
          onClick={closeAlbum}
          disabled={!Boolean(elementsCount)}
        >
          <Text className={cn('ButtonOpenTitle')} style={{ color }}>Открыть</Text>
          <Icon className={cn('ButtonOpenIcon')} icon="play" style={{ fill: color }} />
        </ButtonBox>
      </div>
      <div className={cn('Hover')} style={{ background }}>
        <Text style={{ color }}>
          {elementsCount && (elementsCount > 99 ? '+99' : elementsCount)}
        </Text>
      </div>
    </Section>
  ) : (
    <Flex direction="column" width={100} gap={20}>
      <Flex width={100} justify="space-between">
        <Flex direction="column">
          <Text>{title}</Text>
          <Text>{description}</Text>
        </Flex>
        <IconButton icon="arrow-left" onClick={openAlbum} />
      </Flex>
      <Flex wrap="wrap" width={100} gap={5}>
        {currentMedia.length ? currentMedia.map((photo) => (
          <MediaItem key={photo.id} item={photo} />
        )) : 'Альбом пуст'}
      </Flex>
    </Flex>
  )
}

Album.defaultProps = {
  containerWidth: 400,
}
