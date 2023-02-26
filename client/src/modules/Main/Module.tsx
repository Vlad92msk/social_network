import { makeCn } from '@shared/utils'
import styles from './Module.module.scss'
import { Photo, Resume, Video } from './sections'

const cn = makeCn('Main', styles)

const Module = () => (
  <div className={cn()}>
    <Resume />
    <Photo />
    <Video />
  </div>
)

export default Module
