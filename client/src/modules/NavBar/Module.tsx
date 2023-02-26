import { makeCn } from '@shared/utils'
import { ButtonsList, Footer, Header } from './components'
import styles from './Module.module.scss'

const cn = makeCn('NavBar', styles)

const Module = () => (
  <div className={cn()}>
    <Header />
    <ButtonsList />
    <Footer />
  </div>
)

export default Module
