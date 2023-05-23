'use client'
import React from 'react'
import { makeCn } from '@public/utils'
import styles from './Main.module.scss'
import { Photo, Video } from './sections'

const cn = makeCn('Main', styles)


export const Main = () => (
  <div className={cn()}>
    <Photo />
    <Video />
  </div>
)
