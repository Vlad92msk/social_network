import { makeCn } from '@shared/utils'
import React from 'react'
import styles from './Module.module.scss'
import { Photo, Video } from './sections'

const cn = makeCn('Main', styles)

const Module: React.FC = () => (
  <div className={cn()}>
    <Photo />
    <Video />
  </div>
)

export default Module
