// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid'
import { allUsers } from '../user/allUsers'

export interface Message {
    uuid: string
    fromUserId: string // от кого
    toUserId: string // кому
    textMessage: string // текст сообщения
    dateCreateMessage: Date // дата создания
    dateChangeMessage: Date | null | undefined // дата редактирования
    dateReceiptMessage: Date | null | undefined // дата получения
    dateReadMessage: Date | null | undefined // дата прочтения
    dateRemoveMessage: Date | null | undefined // дата удаления
    prevMessageUuid: string | null | undefined // на какое сообщение был ответ
    prevMessageText: string | null | undefined // на какое сообщение был ответ
    prevMessageAuthor: string | null | undefined // на какое сообщение был ответ
    nextMessageUuid: string | null | undefined // какое сообщение было ответом на это
    prevMessageUserId: string | null | undefined // какой пользователь ответил на это сообщение
    nextMessageUserId: string | null | undefined // какому пользователю отвечает это сообщение
    emojis: string[] // лайки/дизлайки
    files: any[] // приложенные файлы
}

export interface PrivatChatList {
    id: number
    uuid: string
    toUserId: string
    messages: Message[]
}

// Создаем сообщения для каждого приватного чата
const createMessages = (fromUserUuid: string, toUserUuid: string) => {
  const messagesCount = Math.floor(Math.random() * 26) + 5
  const messages: Message[] = []

    // eslint-disable-next-line no-plusplus
  for (let i = 0; i < messagesCount; i++) {
    const uuid = uuidv4()
    const now = new Date()

    messages.push({
      uuid,
      fromUserId: fromUserUuid,
      toUserId: toUserUuid,
      textMessage: `Text message ${i + 1} from User ${fromUserUuid} to User ${toUserUuid}`,
      dateCreateMessage: now,
      dateChangeMessage: null,
      dateReceiptMessage: null,
      dateReadMessage: null,
      dateRemoveMessage: null,
      prevMessageUuid: i > 0 ? messages[i - 1].uuid : null,
      prevMessageText: i > 0 ? messages[i - 1].textMessage : null,
      prevMessageAuthor: i > 0 ? messages[i - 1].fromUserId : null,
      nextMessageUuid: null,
      prevMessageUserId: i > 0 ? messages[i - 1].fromUserId : null,
      nextMessageUserId: null,
      emojis: [],
      files: [],
    })

    if (i > 0) {
      messages[i - 1].nextMessageUuid = uuid
      messages[i - 1].nextMessageUserId = fromUserUuid
    }
  }

  return messages
}

// Теперь используем эти UUID при создании объектов приватных чатов
export const privatChatList: PrivatChatList[] = allUsers[0].social?.privateChat.map((chatUuid, i) => {
  const fromUserUuid = allUsers[0].uuid
  const toUserUuid = allUsers[i + 1].uuid

  return {
    id: i + 1,
    uuid: chatUuid,
    toUserId: toUserUuid,
    messages: createMessages(fromUserUuid, toUserUuid),
  }
}) || []
