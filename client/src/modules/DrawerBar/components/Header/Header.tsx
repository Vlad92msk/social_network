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
    <Text color="title" size="5">Firsov Vlad</Text>
    <Icon className={cn('AlertIcon')} icon="bell" size="small_1" fill="oldAsphalt40" />
  </div>
)
