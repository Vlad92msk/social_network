import { useCallback, useRef, useState } from 'react'
import { FriendsListItem } from '@modules/DrawerBar/components'
import { useDrawerBarSelect } from '@modules/DrawerBar/DrawerBar'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon } from '@shared/components/Icon'
import { MenuListItem, MenuListWithButton } from '@shared/components/MenuList'
import { Popup } from '@shared/components/Popup'
import { Text } from '@shared/components/Text'
import { useRect } from '@shared/hooks'
import { useToggle } from '@shared/hooks/useToggle'
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
  const isBarOpen = useDrawerBarSelect((state) => state.isOpen)


  const handleClickFriend = useCallback(() => {
    console.log(`Кликнул по пользователю ${id}`)
  }, [id])


  return (
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
      <Popup state={{
        // arrow: <Icon icon="arrow-left-sharp" />,
        withDefaultArrow: true
      }}
      >
        <Popup.Button>Button</Popup.Button>
        <Popup.Content>
          <Text>
            Lorem kjwnelfn erkjvf erjhfn erwfner vjnferonf
            weflwef jwebf flkwneof wejf wef
          </Text>
        </Popup.Content>
      </Popup>
      {/* <MenuListWithButton classNameButton={cn('MenuButton')}> */}
      {/*  <MenuListItem */}
      {/*    className={cn('ListItem')} */}
      {/*    text="Удалить" */}
      {/*    onClick={() => console.log('Удалить')} */}
      {/*  /> */}
      {/*  <MenuListItem */}
      {/*    className={cn('ListItem')} */}
      {/*    text="Заблокировать" */}
      {/*    onClick={() => console.log('Заблокировать')} */}
      {/*  /> */}
      {/*  <MenuListItem */}
      {/*    className={cn('ListItem')} */}
      {/*    text="Скрыться" */}
      {/*    onClick={() => console.log('Скрыться')} */}
      {/*  /> */}
      {/* </MenuListWithButton> */}

    </ButtonBox>
  )
}
