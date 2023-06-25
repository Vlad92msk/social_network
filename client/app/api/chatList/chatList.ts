// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid'
import { allUsers } from '../user/allUsers'

export interface ChatList {
    id: number
    uuid: string
    name: string
    image: string
    lastMessage: string
    activeCount: number
    users: string[]
}

// Теперь используем эти UUID при создании объектов чатов
export const chatList: ChatList[] = allUsers[0].social?.groupChat.map((chatUuid, i) => ({
  id: i + 1,
  uuid: chatUuid,
  name: `Group Chat ${i + 1}`,
  image: `group_image${i + 1}.jpg`,
  lastMessage: `Last message in Group Chat ${i + 1}`,
  activeCount: Math.floor(Math.random() * 10) + 1,
  users: [
    allUsers[0].uuid, // Ваш UUID
    ...allUsers.slice(1, 11).map((user) => user.uuid), // UUID ваших друзей
    ...Array(5).fill(null).map(() => uuidv4()), // Случайные UUID
  ],
})) || []
