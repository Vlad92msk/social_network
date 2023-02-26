import { classnames } from '@bem-react/classnames'
import React, { CSSProperties, PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallBack } from '@shared/components/ErrorFallBack'
import { Image, ImageType } from '@shared/components/Image'
import { makeCn } from '@shared/utils'
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
  resetKeys?: any[]
}
export const Section: React.FC<SectionType> = React.memo((
  {
    bcgImg, className,
    style, imgClassName,
    noPaddingLeft, noPaddingRight,
    noPaddingTop, noPaddingBottom,
    resetKeys, children,
  },
) => {
  const paddings = [
    noPaddingLeft && { paddingLeft: 0 },
    noPaddingRight && { paddingRight: 0 },
    noPaddingTop && { paddingTop: 0 },
    noPaddingBottom && { paddingBottom: 0 },
  ].reduce((acc, item) => (item ? { ...acc, ...item } : acc), {})

  return (
    <section
      className={classnames(cn(), className)}
      style={{ ...paddings, ...style }}
    >
      {bcgImg
      && (
        <Image
          className={classnames(imgClassName, cn('Img'))}
          path={bcgImg.path}
          sizePriority={bcgImg.sizePriority}
        />
      )}
      <ErrorBoundary FallbackComponent={ErrorFallBack} resetKeys={resetKeys}>
        {children || null}
      </ErrorBoundary>
    </section>
  )
})
