import { useCallback, useState } from 'react'
import { makeCn, classNames } from '@public/utils'
import { ALBUMS, PHOTOS } from '../../../../src/data/mockPhotos'
import { Album, MediaItem, SectionContainer } from '../components'
import styles from '../Main.module.scss'

const cn = makeCn('Photo', styles)

export const Photo = () => {
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
