import { classnames } from '@bem-react/classnames'
import React, { CSSProperties, PropsWithChildren } from 'react'
import { makeCn, classNames } from '@public/utils'
import { Image, ImageType } from '@shared/components/Image'
import styles from './Section.module.scss'

const cn = makeCn('Base', styles)

interface SectionType extends PropsWithChildren {
  style?: CSSProperties
  className?: string
  bcgImg?: ImageType
  imgClassName?: string
  noPaddingLeft?: boolean
  noPaddingRight?: boolean
  noPaddingTop?: boolean
  noPaddingBottom?: boolean
}
export const Section = React.memo((props: SectionType) => {
  const {
    bcgImg, className, style, imgClassName, noPaddingLeft, noPaddingRight,
    noPaddingTop, noPaddingBottom, children,
  } = props

  const paddings = [
    noPaddingLeft && { paddingLeft: 0 },
    noPaddingRight && { paddingRight: 0 },
    noPaddingTop && { paddingTop: 0 },
    noPaddingBottom && { paddingBottom: 0 },
  ].reduce((acc, item) => (item ? { ...acc, ...item } : acc), {})

  return (
    <section
      className={classNames(cn(), className)}
      style={{ ...paddings, ...style }}
    >
      {bcgImg
      && (
        <Image
          className={classnames(imgClassName, cn('Img'))}
          {...bcgImg}
        />
      )}
      {children}
    </section>
  )
})
