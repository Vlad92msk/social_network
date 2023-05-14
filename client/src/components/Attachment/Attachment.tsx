import React from 'react'
import { AddedFile } from '@public/hooks/useMaterialsAttach'
import { Text } from 'src/components/Text'
import { ButtonBox } from 'public/components/ButtonBox'
import { Icon } from 'public/components/Icon'
import { makeCn } from 'public/utils'
import styles from 'src/components/Attachment/Attachment.module.scss'


const cn = makeCn('Attachment', styles)

export enum ATTACHMENT_ACTION {
  SAVE = 'save',
  PLAY = 'play'
}

type AttachmentProps = {
  attach: AddedFile
  action: ATTACHMENT_ACTION
}

export const Attachment: React.FC<AttachmentProps> = React.memo((props) => {
  const { attach: { name, src }, action } = props

  return (
    <ButtonBox
      className={cn()}
      as="a"
        // @ts-ignore
      href={src}
      download={action === ATTACHMENT_ACTION.SAVE}
    >
      <Icon className={cn('Icon')} icon="file-outlined" />
      <Text className={cn('Name')}>{name}</Text>
    </ButtonBox>
  )
})
