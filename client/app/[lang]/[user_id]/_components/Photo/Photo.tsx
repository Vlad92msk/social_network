'use client'

import { useCallback, useState } from 'react'
import { makeCn } from '@public/utils'
import styles from './Photo.module.scss'
import { ALBUMS, PHOTOS } from '../../../../../src/data/mockPhotos'
import { Album, MediaItem, SectionContainer } from '.'

const cn = makeCn('Photo', styles)

export default function Photo() {
  const [visibleType, setVisibleType] = useState<string>()

  const changeVisibleType = useCallback((value: string | number) => {
    setVisibleType(String(value))
  }, [])
  return (
    <SectionContainer
      className={cn()}
      title="Фото"
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
        PHOTOS.map((photo) => (
          <MediaItem key={photo.id} item={photo} />
        ))
      )}
    </SectionContainer>
  )
}
