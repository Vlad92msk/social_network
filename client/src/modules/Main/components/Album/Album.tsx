import { classnames } from '@bem-react/classnames'
import { PropsWithChildren, useMemo } from 'react'
import { MediaItem } from '@modules/Main/components'
import { PHOTOS } from '@modules/Main/sections/photo/mock'
import { AlbumType } from '@modules/Main/types/album'
import { ButtonBox } from '@shared/components/ButtonBox'
import { FieldRow } from '@shared/components/FieldRow'
import { Icon } from '@shared/components/Icon'
import { IconButton } from '@shared/components/IconButton'
import { Section } from '@shared/components/Section'
import { Text } from '@shared/components/Text'
import { useBooleanState, useGetAccentImageColor } from '@shared/hooks'
import { createString, makeCn } from '@shared/utils'
import styles from './Album.module.scss'


const cn = makeCn('Album', styles)

interface SectionContainerProps {
  album: AlbumType
  className?: string
  elementsCount?: number
  containerWidth?: number
}

export const Album = (props: PropsWithChildren<SectionContainerProps>) => {
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
      className={classnames(cn(), className)}
      style={{ height: `clamp(200px, calc(${containerWidth / 3 + 50}px), 380px)` }}
      bcgImg={{
        path: {
          moduleName: 'users',
          folder: 'photo',
          img: bcg,
        },
      }}
    >
      <div className={cn('Preview')} style={{ background }}>
        <Text weight="bold" size="6" style={{ color }}>{title}</Text>
        <Text style={{ color }}>{description}</Text>
        <ButtonBox
          className={cn('ButtonOpen')}
          style={{ background }}
          onClick={closeAlbum}
          disabled={!Boolean(elementsCount)}
        >
          <Text className={cn('ButtonOpenTitle')} style={{ color }}>Открыть</Text>
          <Icon className={cn('ButtonOpenIcon')} icon="play" size="ordinary" style={{ fill: color }} />
        </ButtonBox>
      </div>
      <div className={cn('Hover')} style={{ background }}>
        <Text size="6" style={{ color }}>
          {elementsCount > 99 ? '+99' : elementsCount}
        </Text>
      </div>
    </Section>
  ) : (
    <FieldRow direction="column" width="100" gap="20px">
      <FieldRow width="100" justify="between">
        <FieldRow direction="column">
          <Text weight="bold" size="6" color="title">{title}</Text>
          <Text size="2" color="title">{description}</Text>
        </FieldRow>
        <IconButton icon="arrow-left" onClick={openAlbum} fill="oldAsphalt40" />
      </FieldRow>
      <FieldRow wrap="wrap" width="100" gap="5px">
        {currentMedia.length ? currentMedia.map((photo) => (
          <MediaItem key={photo.id} item={photo} />
        )) : 'Альбом пуст'}
      </FieldRow>
    </FieldRow>
  )
}
