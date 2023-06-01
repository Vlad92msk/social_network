import { PropsWithChildren } from 'react'
import { makeCn, classNames } from '@public/utils'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = (props: PropsWithChildren) => (
  <main className={cn()}>
    {props.children}
  </main>
)
