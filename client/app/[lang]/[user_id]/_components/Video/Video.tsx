'use client'

import { useCallback, useState } from 'react'
import { makeCn } from '@public/utils'
import styles from './Video.module.scss'
import { ALBUMS, VIDEOS } from '../../../../../src/data/mockVideos'
import { Album, MediaItem, SectionContainer } from '.'

const cn = makeCn('Video', styles)

export default function Video() {
  const [visibleType, setVisibleType] = useState<string>()

  const changeVisibleType = useCallback((value: string | number) => {
    setVisibleType(String(value))
  }, [])
  return (
    <SectionContainer
      className={cn()}
      title="Видео"
      lastAdded={new Date()}
      changeVisibleType={changeVisibleType}
    >
      {visibleType === 'albums' ? (
        ALBUMS.map((album) => (
          <Album
            key={album.id}
            elementsCount={album.elements.length}
            album={album}
          />
        ))
      ) : (
        VIDEOS.map((photo) => (
          <MediaItem key={photo.id} item={photo} />
        ))
      )}
    </SectionContainer>
  )
}
