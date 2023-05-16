import { useCallback } from 'react'
import { useToggle } from 'usehooks-ts'
import { FriendsListItem } from '@modules/DrawerBar/components/index'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon } from '@public/components/Icon'
import { Modal } from '@public/components/Modal'
import { makeCn } from '@public/utils'
import { IMGPreview, UserStatus, UserStatusEnum } from '../../../components'
import { MenuList } from '../../../components/MenuList/MenuList'
import { Text } from '../../../components/Text'
import styles from '../DrawerBar.module.scss'

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

  const [open, setOpen] = useToggle(false)

  const handleClickFriend = useCallback(() => {
    console.log(`Кликнул по пользователю ${id}`)
  }, [id])

  return (
    <>
      <ButtonBox
        className={cn()}
        onClick={handleClickFriend}
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
                  setOpen()
                }}
              >
                <Icon icon="message-square" />
                <Text className={cn('MessageCount', { visible: Boolean(messageCount) })} size="8">
                  {(messageCount || 0) > 9 ? '+9' : messageCount}
                </Text>
              </ButtonBox>
              <Text
                className={cn('LastTime', { visible: status === UserStatusEnum.OFFLINE })}
                size="8"
              >
                13:42
              </Text>
            </div>
          </div>
        </div>
        <MenuList classNameButton={cn('MenuList')} position="left">
          <Text className={cn('ListItem')} onClick={() => console.log('Удалить')}>Удалить</Text>
          <Text className={cn('ListItem')} onClick={() => console.log('Заблокировать')}>Заблокировать</Text>
          <Text className={cn('ListItem')} onClick={() => console.log('Скрыться')}>Скрыться</Text>
        </MenuList>
      </ButtonBox>
      <Modal open={open}>
        <ButtonBox onClick={setOpen}>
          CLOSE
        </ButtonBox>
        MODAL
      </Modal>
    </>
  )
}