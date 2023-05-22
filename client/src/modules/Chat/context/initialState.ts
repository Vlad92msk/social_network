import { Message } from '../../../data/messages'
import { USER } from '../../../data/user'
import { RefObject } from "react";


export type DefaultNewMessage = Partial<Message>


export interface StateModule {
  messages?: Message[]
  defaultMessage?: DefaultNewMessage
  newMessage?: Partial<Message>
  chatContainer?: RefObject<HTMLDivElement>
}


export const initialState: StateModule = {
  messages: [],
  defaultMessage: {
    uuid: undefined,
    fromUserId: USER.id,
    toUserId: undefined,
    textMessage: undefined,
    dateCreateMessage: undefined,
    dateChangeMessage: null,
    dateReceiptMessage: null,
    dateReadMessage: null,
    dateRemoveMessage: null,
    prevMessageUuid: null,
    nextMessageUuid: null,
    prevMessageUserId: null,
    nextMessageUserId: null,
    emojis: [],
    files: [],
  },
  newMessage: undefined,
  chatContainer: undefined,
}
