import { useCallback } from 'react'
import { useToggle } from 'usehooks-ts'
import { FriendsListItem } from '@modules/DrawerBar/components'
import { useDrawerBarSelect } from '@modules/DrawerBar/DrawerBar'
import { Icon } from 'public/components/Icon'
import { Text } from 'src/components/Text'
import { ButtonBox } from 'public/components/ButtonBox'
import { Modal } from 'public/components/Modal'
import { makeCn } from 'public/utils'
import { IMGPreview, UserStatus, UserStatusEnum } from 'src/components'
import styles from './FriendItem.module.scss'
import { MenuList } from '../../../../components/MenuList/MenuList'

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
  const isBarOpen = useDrawerBarSelect((state) => state.isOpen)

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
        { isBarOpen && (
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
                <Icon
                  icon="message-square"
                  fill="bluePrimrose50"
                  size="small"
                />
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
        ) }
        <MenuList position="left">
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
