'use client'

import { PropsWithChildren, useCallback } from 'react'
import { IconCount, Section } from '@common'
import { classNames, makeCn } from '@public/utils'
import styles from './Photo.module.scss'
import { MediaItemType } from '../../../../_modules/Main/types/mediaItem'


const cn = makeCn('MediaItem', styles)

interface SectionContainerProps {
  className?: string
  item: MediaItemType
  containerWidth?: number
}

export const MediaItem = (props: PropsWithChildren<SectionContainerProps>) => {
  const { containerWidth, className, item } = props

  const handleOpenComments = useCallback(() => {
    console.log('item', item)
  }, [item])


  return (
    <Section
      className={classNames(cn(), className)}
      bcgImg={{
        path: {
          moduleName: 'users',
          folder: 'photo',
          img: item.path,
        },
        withContainer: true,
      }}
    >
      <div className={cn('Buttons')}>
        <IconCount
          icon="message-square"
          value={item.commentsCount}
          isButton
          onClick={handleOpenComments}
          item={item}
        />
        <IconCount icon="eye" value={item.viewCount} countBcg="other" />
        <IconCount icon="heart" value={item.likeCount} countBcg="other" />
        <IconCount icon="dislike" value={item.disLikeCounts} countBcg="other" />
      </div>
    </Section>
  )
}
