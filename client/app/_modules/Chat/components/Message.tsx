import { format } from 'date-fns'
import { Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { Flex } from '@public/components/Flex'
import { useRect, useScrollToElement } from '@public/hooks'
import { DateFormats, makeCn } from '@public/utils'
import { Message as MessageType } from '../../../../src/data/messages'
import { USER } from '../../../../src/data/user'
import styles from '../Chat.module.scss'
import { useRef } from "react";


export const cn = makeCn('Message', styles)
export interface MessageProps extends MessageType {
  containerRef: any
}


const messageFrom = (uuid: string) => (uuid === USER.id ? 'me' : 'from')

export const Message = (props: MessageProps) => {
  const {
    uuid,
    fromUserId,
    toUserId,
    textMessage,
    dateCreateMessage,
    dateChangeMessage,
    dateReceiptMessage,
    dateReadMessage,
    dateRemoveMessage,
    prevMessageUuid,
    nextMessageUuid,
    prevMessageUserId,
    prevMessageText,
    prevMessageAuthor,
    nextMessageUserId,
    emojis,
    files,
    containerRef,
  } = props

  const mainTextRef = useRef<HTMLSpanElement>(null)
  const rect = useRect(mainTextRef, ['width'])

  const handleElementClick = useScrollToElement({
    targetElementId: prevMessageUserId,
    containerRef,
    position: 'bottom',
  })

  return (
    <Flex
      id={uuid}
      className={cn({ where: messageFrom(fromUserId) })}
      direction="column"
      gap={10}
    >
      <ButtonBox className={cn('PrevMessageInfo')} onClick={handleElementClick} style={{ width: rect?.width }}>
        <Text bold>{prevMessageAuthor}</Text>
        <Text>{prevMessageText}</Text>
      </ButtonBox>
      <Flex direction="column" width={100}>
        <Flex wrap="wrap">
          {files?.map((file) => <span>{file}</span>)}
        </Flex>
        <Text className={cn('TextMessage')} ref={mainTextRef}>{textMessage}</Text>
      </Flex>
      <Flex width={100} justify="space-between">
        <div>
          {emojis?.map((emoji) => <span key={emoji}>{emoji}</span>)}
        </div>
        <Text size="8">
          {format(dateCreateMessage, DateFormats.FORMAT_7)}
        </Text>
      </Flex>
    </Flex>
  )
}
