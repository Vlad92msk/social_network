import { Image } from '@shared/components/Image'
import { makeCn } from '@shared/utils'
import styles from './UserIMGPreview.module.scss'

const cn = makeCn('UserIMGPreview', styles)

interface UserIMGPreviewProps {
  moduleName: string
  folder: string
  img: string
}

export const UserIMGPreview = (props: UserIMGPreviewProps) => (
  <Image
    classNameContainer={cn()}
    withContainer
    path={props}
  />
)
