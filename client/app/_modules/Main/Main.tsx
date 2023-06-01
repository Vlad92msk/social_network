'use client'

import React from 'react'
import { makeCn } from '@public/utils'
import styles from './Main.module.scss'

const cn = makeCn('Main', styles)


export const Main = (props) => (
  <div className={cn()}>
    {/* <Photo /> */}
    {props.children}
    {/* <Video /> */}
  </div>
)
