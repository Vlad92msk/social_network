'use client'
import React from 'react'
import { makeCn, classNames } from '@public/utils'
import styles from './Main.module.scss'
import { Photo, Video } from './sections'

const cn = makeCn('Main', styles)


export const Main = (props) => (
  <div className={cn()}>
    {/*<Photo />*/}
    {props.children}
    {/*<Video />*/}
  </div>
)
