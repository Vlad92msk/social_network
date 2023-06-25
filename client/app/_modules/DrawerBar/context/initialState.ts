import { ChatList } from '../../../api/chatList/chatList'
import { FriendList } from '../../../api/friendList/friendList'
import { PrivatChatList } from '../../../api/privatChatList/privatChatList'

export interface StateModule {
  search?: string
  isOpen: boolean
  friendList: FriendList[]
  privatChatList: PrivatChatList[]
  groupChatList: ChatList[]
}


export const initialState: StateModule = {
  search: '',
  isOpen: true,
  friendList: [],
  groupChatList: [],
  privatChatList: [],
}
