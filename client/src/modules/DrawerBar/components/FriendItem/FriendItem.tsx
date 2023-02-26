import { useCallback } from 'react'
import { FriendsListItem } from '@modules/DrawerBar/components'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon } from '@shared/components/Icon'
import { MenuListItem, MenuListWithButton } from '@shared/components/MenuList'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import { IMGPreview, UserStatus, UserStatusEnum } from 'src/components'
import styles from './FriendItem.module.scss'

const cn = makeCn('FriendItem', styles)

interface FriendItem {
  friend: FriendsListItem
}

export const FriendItem = (props: FriendItem) => {
  const {
    friend: {
      id,
      name,
      img,
      status,
      messageCount,
    },
  } = props

  const handleClickFriend = useCallback((friendId: number) => {
    console.log(`Кликнул по пользователю ${friendId}`)
  }, [])

  return (
    <ButtonBox
      className={cn()}
      onClick={() => handleClickFriend(id)}
    >
      <IMGPreview moduleName="users" folder="photo" img={img} />
      <div className={cn('TextContainer')}>
        <Text className={cn('FriendName')}>{name}</Text>
        <div className={cn('Main')}>
          <UserStatus status={status} />
          <div className={cn('MainContainer')}>
            <ButtonBox
              className={cn('Message', { visible: Boolean(messageCount) })}
              onClick={(e) => {
                e.stopPropagation()
                console.log('Написать')
              }}
            >
              <Icon
                icon="message-square"
                fill="bluePrimrose50"
                size="small_1"
              />
              <Text className={cn('MessageCount', { visible: Boolean(messageCount) })} size="1" color="body">
                {messageCount > 9 ? '+9' : messageCount}
              </Text>
            </ButtonBox>
            <Text
              className={cn('LastTime', { visible: status === UserStatusEnum.OFFLINE })}
              size="1"
            >
              13:42
            </Text>
          </div>
        </div>
      </div>
      <MenuListWithButton classNameButton={cn('MenuButton')}>
        <MenuListItem
          className={cn('ListItem')}
          text="Удалить"
          onClick={() => console.log('Удалить')}
        />
        <MenuListItem
          className={cn('ListItem')}
          text="Заблокировать"
          onClick={() => console.log('Заблокировать')}
        />
        <MenuListItem
          className={cn('ListItem')}
          text="Скрыться"
          onClick={() => console.log('Скрыться')}
        />
      </MenuListWithButton>
    </ButtonBox>
  )
}
