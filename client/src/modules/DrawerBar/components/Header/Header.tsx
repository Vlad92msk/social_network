import { makeCn } from '@public/utils'
import { Image } from '@shared/components/Image'
import { Icon } from 'public/components/Icon'
import { Text } from 'src/components/Text'
import styles from './Header.module.scss'

const cn = makeCn('Header', styles)

export const Header = () => (
  <div className={cn()}>
    <div className={cn('PhotoBox')}>
      <Image path={{
        moduleName: 'users', folder: 'photo', img: '1',
      }}
      />
    </div>
    <Text color="title">Firsov Vlad</Text>
    <Icon className={cn('AlertIcon')} icon="bell" />
  </div>
)
