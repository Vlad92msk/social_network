import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { forwardRef, useMemo } from 'react'
import { Modal } from '@shared/components/Modal'
import { useToggle } from '@shared/hooks/useToggle'
import { createString, makeCn } from '@shared/utils'
import styles from './Image.module.scss'

const cn = makeCn('Image', styles)


export interface ImagePath {
  moduleName?: string
  folder?: string
  img: string
}


export const createImagePath = (path: ImagePath) => {
  const { img, folder, moduleName } = path
  if (
    !moduleName || !moduleName.length
    || !folder || !folder.length
    || !img || !img.length
  ) {
    return `/resources/images${createString(['app', 'bcg', 'noImg'], '/')}`
  }
  return `/resources/images${createString([moduleName, folder, img], '/')}`
}

export interface ImageType {
  path: ImagePath
  sizePriority?: 'width' | 'height' | 'cover' | 'contain'
  className?: string
  classNameContainer?: string
  isOpenFullScreen?: boolean
  withOptimized?: boolean
  withContainer?: boolean
}

export const Image: React.FC<ImageType> = forwardRef((props, ref: any) => {
  const {
    className, sizePriority, path, isOpenFullScreen, withOptimized, withContainer, classNameContainer,
  } = props
  const { img } = path
  const src = createImagePath(path)

  const [isOpen, setOpen] = useToggle()

  /**
   * TODO: withOptimized - временное решение, ак будет конвертация в avif и webp на бэке - убрать этот параметр
   */
  const picture = useMemo(() => (
    withOptimized ? (
      <picture className={cn()}>
        <source type="image/webp" srcSet={`${src}.webp`} />
        <source type="image/avif" srcSet={`${src}.avif`} />
        <img
          ref={ref}
          className={classnames(cn('Img', { sizePriority }), className)}
          onClick={setOpen}
          src={`${src}.webp`}
          alt={img}
        />
      </picture>
    ) : (
      <img
        ref={ref}
        className={classnames(cn('Img', { sizePriority }), className)}
        onClick={setOpen}
        src={img}
        alt={img}
      />
    )
  ), [withOptimized, src, ref, sizePriority, className, setOpen, img])

  return (
    <>
      {withContainer ? (
        <div className={classnames(cn('Container'), classNameContainer)}>{picture}</div>
      ) : picture}
      {
        isOpenFullScreen && (
          <Modal className={cn('Modal')} open={isOpen} onClose={setOpen}>
            <div className={cn('ModalImgContainer')}>
              {picture}
            </div>
          </Modal>
        )
      }
    </>
  )
})

export const MImage = motion(Image)

Image.defaultProps = {
  path: {} as ImagePath,
  sizePriority: 'cover',
  withOptimized: true,
}
