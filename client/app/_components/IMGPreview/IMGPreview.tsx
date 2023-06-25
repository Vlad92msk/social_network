import { makeCn } from '@public/utils'
import { Image } from '@shared/components/Image'
import styles from './IMGPreview.module.scss'

const cn = makeCn('IMGPreview', styles)

interface IMGProps {
  moduleName: string
  folder: string
  img: string
}

export const IMGPreview = (props: IMGProps) => (
  <Image
    classNameContainer={cn()}
    withContainer
    path={props}
  />
)
