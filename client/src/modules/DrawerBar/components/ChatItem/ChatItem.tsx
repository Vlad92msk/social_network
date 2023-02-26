import { AddNewMessageUsers, ChatsItem } from '@modules/DrawerBar/components'
import { ButtonBox } from '@shared/components/ButtonBox'
import { MenuListItem, MenuListWithButton } from '@shared/components/MenuList'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import { IMGPreview, UserOlineForOf } from 'src/components'
import styles from './ChatItem.module.scss'

const cn = makeCn('ChatItem', styles)

interface ChatItem {
  chats: ChatsItem
  onClickFriendItem: (friendId: number) => void
}

export const ChatItem = (props: ChatItem) => {
  const {
    chats: {
      id, name, img, lastMessage, activeCount,
    },
    onClickFriendItem,
  } = props
  return (
    <ButtonBox
      className={cn()}
      onClick={() => onClickFriendItem(id)}
    >
      <div className={cn('UsersForOf')}>
        <IMGPreview moduleName="users" folder="photo" img={img} />
        <UserOlineForOf activeCount={1} totalCount={500} />
      </div>
      <div className={cn('TextContainerMain')}>
        <div className={cn('TextContainer')}>
          <Text className={cn('FriendName')} size="2" weight="bold" color="title">{name}</Text>
          <Text className={cn('FriendName')} size="1" color="body">{lastMessage}</Text>
        </div>
        <AddNewMessageUsers lastUser="d" prevUser="d" addCount={60} />
      </div>

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
