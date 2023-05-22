import { useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { Form, FormController, InputArea, MenuList, Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { IconButton } from '@public/components/IconButton'
import { createStoreContext, makeCn } from '@public/utils'
import styles from './Chat.module.scss'
import { MessageContainer } from './components'
import { initialState } from './context/initialState'
import { Message } from '../../data/messages'

export const cn = makeCn('Chat', styles)


interface FormMessage {
  message: string
}

export const {
  contextWrapper,
  useContextSelector: useChatSelect,
  useContextDispatch: useChatUpdate,
} = createStoreContext({
  name: 'Chat',
  initialState,
})

interface ChatProps {
  setOpen: () => void
}


export const Chat = contextWrapper((props: ChatProps) => {
  const { setOpen } = props
  const update = useChatUpdate()

  const handleSubmitMessage = useCallback((formData: FormMessage, reset: UseFormReset<FormMessage>) => {
    update((ctx) => {
      const chatContainer = ctx.chatContainer?.current
      // скролимся к низу после отправки сообщения
      if (chatContainer) {
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight
        }, 1)
      }

      // @ts-ignore
      const createdNewMessage: Message = {
        ...ctx.defaultMessage,
        uuid: new Date().toString(),
        textMessage: formData.message,
        dateCreateMessage: new Date(),
      }

      return ({
        ...ctx,
        newMessage: createdNewMessage,
        messages: [...(ctx.messages || []), createdNewMessage],
      })
    })

    reset()
  }, [update])

  console.log('rerender')

  return (
    <div className={cn()}>
      <IconButton className={cn('ModalCloseBtn')} icon="close" onClick={setOpen} />
      <div className={cn('Inner')}>
        <div className={cn('Info')}>
          <div className={cn('InfoUserContainer')}>
            <IconButton icon="video" disabled />
            <Text>Мой Друг</Text>
            <IconButton icon="headphones" />
          </div>
          <MenuList position="left" classNameButton={cn('InfoMenuList')}>
            <ButtonBox>11</ButtonBox>
            <ButtonBox>22</ButtonBox>
            <ButtonBox>33</ButtonBox>
          </MenuList>
        </div>
        <MessageContainer />
        <Form<FormMessage>
          className={cn('PrintActionsForm')}
          onSubmit={handleSubmitMessage}
          setup={{
            defaultValues: {
              message: '',
            },
          }}
        >
          <IconButton icon="attachment" />
          <FormController
            className={cn('PrintActionsAddMessageField')}
            name="message"
            rules={{
              required: {
                value: true,
                message: 'Необходимо ввести текст',
              },
            }}
          >
            <InputArea className={cn('PrintActionsAddMessageInput')} placeholder="Сообщение..." />
          </FormController>
          <IconButton icon="play" type="submit" />
        </Form>
      </div>
    </div>
  )
})
