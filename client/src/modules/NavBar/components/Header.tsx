import { Text } from '@common'
import { makeCn } from '@public/utils'
import { Image } from '@shared/components/Image'
import styles from '../NavBar.module.scss'

const cn = makeCn('Header', styles)

export const Header = () => (
  <div className={cn()}>
    <div className={cn('PhotoBox')}>
      <Image path={{
        moduleName: 'users', folder: 'photo', img: '1',
      }}
      />
    </div>
    <Text size="16">Firsov Vlad</Text>
    <span className={cn('Status', { status: 'online' })} />
  </div>
)
