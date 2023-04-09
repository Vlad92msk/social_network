import { AddNewMessageUsers, ChatsItem } from '@modules/DrawerBar/components'
import { useDrawerBarSelect } from '@modules/DrawerBar/DrawerBar'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Image } from '@shared/components/Image'
import { MenuListItem, MenuListWithButton } from '@shared/components/MenuList'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import { UserOlineForOf } from 'src/components'
import styles from './ChatItem.module.scss'

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

      <MenuListWithButton classNameButton={cn('MenuButton')}>
        <MenuListItem
          className={cn('ListItem')}
          text="Удалить"
          onClick={() => console.log('Написать')}
        />
        <MenuListItem
          className={cn('ListItem')}
          text="Заблокировать"
          onClick={() => console.log('Скрыть')}
        />
        <MenuListItem
          className={cn('ListItem')}
          text="Скрыться"
          onClick={() => console.log('Заблокировать на 30 мин')}
        />
        <MenuListItem
          className={cn('ListItem')}
          text="Скрыться"
          onClick={() => console.log('Выйти')}
        />
      </MenuListWithButton>
    </ButtonBox>
  )
}
