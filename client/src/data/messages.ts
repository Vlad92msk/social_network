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

export const MESSAGES: Message[] = [
  {
    uuid: ';fwoehrf-welfkberw',
    fromUserId: 'jhbfefwf-fejbrf-lerkwnf1',
    toUserId: '1',
    textMessage: 'Сообщение №1 от jhbfefwf-fejbrf-lerkwnf1',
    dateCreateMessage: new Date(),
    dateChangeMessage: new Date(),
    dateReceiptMessage: new Date(),
    dateReadMessage: new Date(),
    dateRemoveMessage: new Date(),
    prevMessageText: undefined,
    prevMessageAuthor: undefined,
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: null,
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
  {
    uuid: ';fwoehrf-welfkberw2',
    fromUserId: 'jhbfefwf-fejbrf-lerkwnf',
    toUserId: '1',
    textMessage: 'Сообщение №2 от jhbfefwf-fejbrf-lerkwnf1',
    dateCreateMessage: new Date(),
    dateChangeMessage: new Date(),
    dateReceiptMessage: new Date(),
    prevMessageText: undefined,
    prevMessageAuthor: undefined,
    dateReadMessage: new Date(),
    dateRemoveMessage: new Date(),
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: null,
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
  {
    uuid: ';fwoehrf-welfkberw3',
    fromUserId: '1',
    toUserId: 'jhbfefwf-fejbrf-lerkwnf',
    textMessage: 'Мое сообщение №1 пользователю jhbfefwf-fejbrf-lerkwnf1',
    dateCreateMessage: new Date(),
    dateChangeMessage: new Date(),
    prevMessageText: undefined,
    prevMessageAuthor: undefined,
    dateReceiptMessage: new Date(),
    dateReadMessage: new Date(),
    dateRemoveMessage: new Date(),
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: null,
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
  {
    uuid: ';fwoehrf-welfkberw4',
    fromUserId: '1',
    toUserId: 'jhbfefwf-fejbrf-lerkwnf',
    textMessage: 'Мое сообщение №2 пользователю jhbfefwf-fejbrf-lerkwnf1',
    dateCreateMessage: new Date(),
    dateChangeMessage: new Date(),
    prevMessageText: 'ответ на этот текст ответ на этот текст ответ на этот текст ответ на этот текст ответ на этот текст ответ на этот текст ответ на этот текст',
    prevMessageAuthor: 'Мой друг',
    dateReceiptMessage: new Date(),
    dateReadMessage: new Date(),
    dateRemoveMessage: new Date(),
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: ';fwoehrf-welfkberw',
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
  {
    uuid: ';fwoehrf-welfkberw5',
    fromUserId: 'jhbfefwf-fejbrf-lerkwnf',
    toUserId: '1',
    textMessage: 'Сообщение №3',
    dateCreateMessage: new Date(),
    prevMessageText: undefined,
    prevMessageAuthor: undefined,
    dateChangeMessage: new Date(),
    dateReceiptMessage: new Date(),
    dateReadMessage: new Date(),
    dateRemoveMessage: new Date(),
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: null,
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
]
