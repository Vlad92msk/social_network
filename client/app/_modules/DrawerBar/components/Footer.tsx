import { Text } from '@common'
import { Icon } from '@public/components/Icon'
import { useToggle } from '@public/hooks'
import { classNames, makeCn } from '@public/utils'
import { useDrawerBarSelect } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'
import { ChatItem } from './index'

const cn = makeCn('Footer', styles)


export const Footer = () => {
  const [open, setOpen] = useToggle(false)
  const groupChatList = useDrawerBarSelect((ctx) => ctx.groupChatList)
  return (
    <div className={cn({ open })}>
      <div className={cn('Title')}>
        <Text color="title">Чаты</Text>
        <Icon className={cn('ToggleOpenChats', { open })} icon="chevron-up" onClick={setOpen} />
      </div>
      <div className={cn('ChatsContainer')}>
        {groupChatList?.map((chat) => (
          <ChatItem key={chat.id} onClickFriendItem={() => 1} chats={chat} />
        ))}
      </div>
    </div>
  )
}
