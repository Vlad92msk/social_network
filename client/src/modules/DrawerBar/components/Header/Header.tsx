import { Icon } from '@shared/components/Icon'
import { Image } from '@shared/components/Image'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
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
    <Icon className={cn('AlertIcon')} icon="bell" fill="oldAsphalt40" />
  </div>
)
