import React from 'react'
import { createStoreContext, makeCn } from '@public/utils'
import { initialState } from './context/initialState'
import styles from './Main.module.scss'
import { Photo, Video } from './sections'

const cn = makeCn('Main', styles)

export const {
  contextWrapper,
  useContextSelector: useMainSelect,
  useContextDispatch: useMainUpdate,
} = createStoreContext({
  name: 'Main',
  initialState,
})


export const Main = contextWrapper(() => (
  <div className={cn()}>
    <Photo />
    <Video />
  </div>
))
