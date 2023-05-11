import { AddNewMessageUsers, ChatsItem } from '@modules/DrawerBar/components'
import { useDrawerBarSelect } from '@modules/DrawerBar/DrawerBar'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Image } from '@shared/components/Image'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import { UserOlineForOf } from 'src/components'
import styles from './ChatItem.module.scss'
import { MenuList } from '../../../../components/MenuList/MenuList'

const cn = makeCn('ChatItem', styles)

interface ChatItem {
  chats: ChatsItem
  onClickFriendItem: (friendId: number) => void
}

export const ChatItem = (props: ChatItem) => {
  const {
    chats: {
      id, name, img, lastMessage,
    },
    onClickFriendItem,
  } = props
  const active = useDrawerBarSelect((ctx) => ctx.isOpen)

  return (
    <ButtonBox
      className={cn({ active })}
      onClick={() => onClickFriendItem(id)}
    >
      <div className={cn('UsersForOf')}>
        <Image
          withContainer
          path={{ moduleName: 'users', folder: 'photo', img }}
        />
        <UserOlineForOf totalCount={500} />
      </div>
      {active && (
      <div className={cn('TextContainerMain')}>
        <div className={cn('TextContainer')}>
          <Text className={cn('FriendName')}>{name}</Text>
          <Text className={cn('FriendName')}>{lastMessage}</Text>
        </div>
        <AddNewMessageUsers lastUser="d" prevUser="d" addCount={60} />
      </div>
      )}

      <MenuList position="bottom" classNameButton={cn('MenuButton')}>
        <Text className={cn('ListItem')} onClick={() => console.log('Удалить')}>
          Удалить
        </Text>
        <Text className={cn('ListItem')} onClick={() => console.log('Заблокировать')}>
          Заблокировать
        </Text>
        <Text className={cn('ListItem')} onClick={() => console.log('Скрыться')}>
          Скрыться
        </Text>
        <Text className={cn('ListItem')} onClick={() => console.log('Скрыться')}>
          Скрыться
        </Text>
      </MenuList>
    </ButtonBox>
  )
}
