import { MenuList, Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { IconButton } from '@public/components/IconButton'
import { createStoreContext, makeCn } from '@public/utils'
import styles from './Chat.module.scss'
import { initialState } from './context/initialState'
import { Form } from '../../components/Form/Form'
import { FormController } from '../../components/Form/FormController'
import { InputArea } from '../../components/InputText'

export const cn = makeCn('Chat', styles)


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
        <div className={cn('MessageContainer')}>
          <div className={cn('Ddddd')}>MessageContainer</div>
        </div>
        <Form
          className={cn('PrintActionsForm')}
          onSubmit={(r) => console.log(r)}
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
            <InputArea
              className={cn('PrintActionsAddMessageInput')}
            />
          </FormController>
          <input type="submit" />
        </Form>
      </div>
    </div>
  )
})
