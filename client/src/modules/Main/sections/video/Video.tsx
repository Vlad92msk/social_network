import { useCallback, useState } from 'react'
import { makeCn } from '@shared/utils'
import { Album, MediaItem, SectionContainer } from '../../components'
import { ALBUMS, VIDEOS } from './mock'
import styles from './Video.module.scss'

const cn = makeCn('Video', styles)

export const Video = () => {
  const [visibleType, setVisibleType] = useState<string>(null)

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
