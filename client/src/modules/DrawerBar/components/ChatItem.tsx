import { AddNewMessageUsers, ChatsItem } from '@modules/DrawerBar/components/index'
import { useDrawerBarSelect } from '@modules/DrawerBar/DrawerBar'
import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn } from '@public/utils'
import { Image } from '@shared/components/Image'
import { UserOlineForOf } from '../../../components'
import { MenuList } from '../../../components/MenuList/MenuList'
import { Text } from '../../../components/Text'
import styles from '../DrawerBar.module.scss'

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