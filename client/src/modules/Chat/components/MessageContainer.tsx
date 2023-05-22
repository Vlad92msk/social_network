import { useRef } from 'react'
import { useEffectOnce } from '@public/hooks'
import { Message } from './Message'
import { cn, useChatSelect, useChatUpdate } from '../Chat'


export const MessageContainer = () => {
  const update = useChatUpdate()
  const messages = useChatSelect((ctx) => ctx.messages)
  const ref = useRef<HTMLDivElement>(null)


  useEffectOnce(() => {
    const target = ref.current
    if (target) {
      target.scrollTo({ top: target.clientHeight })
      update(() => ({ chatContainer: ref }))
    }
  })


  return (
    <div className={cn('MessageContainer')} ref={ref}>
      {messages?.map(({ uuid, ...messageInfo }) => (
        <Message key={uuid} {...messageInfo} uuid={uuid} containerRef={ref} />
      ))}
    </div>
  )
}
