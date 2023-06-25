import { useCallback } from 'react'
import { IMGPreview, MenuList, Text, UserStatus, UserStatusEnum } from '@common'
import { Chat } from '@modules'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon } from '@public/components/Icon'
import { Modal } from '@public/components/Modal'
import { useToggle } from '@public/hooks'
import { makeCn } from '@public/utils'
import { MESSAGES } from '../../../../src/data/messages'
import { FriendList } from '../../../api/friendList/friendList'
import styles from '../DrawerBar.module.scss'

const cn = makeCn('FriendItem', styles)

interface FriendItem {
  friend: FriendList
}

export const FriendItem = (props: FriendItem) => {
  const {
    friend: {
      id,
      name,
      image,
      uuid,
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
        <IMGPreview moduleName="allUsers" folder="photo" img="dd" />
        <div className={cn('TextContainer')}>
          <Text className={cn('FriendName')}>{name}</Text>
          <div className={cn('Main')}>
            <UserStatus status={UserStatusEnum.ONLINE} />
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
                className={cn('LastTime', { visible: true })}
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
      <Modal className={cn('ChatModal')} open={open}>
        <Chat setOpen={setOpen} state={{ messages: MESSAGES }} />
      </Modal>
    </>
  )
}
