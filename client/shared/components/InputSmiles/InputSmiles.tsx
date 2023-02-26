import { classnames } from '@bem-react/classnames'
import { Popup } from '@shared/components/Popup'
import { Picker } from 'emoji-mart'
import { PickerProps } from 'emoji-mart/dist-es'
import React, { useCallback, useRef, useState } from 'react'

import { IconName } from '@public/models/icon.model'
import { IconButton } from '@shared/components/IconButton'
import { makeCn } from '@shared/utils'
import styles from './InputSmiles.module.scss'


const cn = makeCn('InputSmiles', styles)

type InputSmilesProps = {
  className?: string
  icon?: IconName
  textAreaRef?: React.MutableRefObject<HTMLTextAreaElement>
  setText: React.Dispatch<React.SetStateAction<string>>
  smilePickerProps?: PickerProps
}

export const InputSmiles: React.FC<InputSmilesProps> = React.memo((props) => {
  const { className, icon, textAreaRef, setText, smilePickerProps } = props

  const smilesRef = useRef<HTMLDivElement>(null)

  const [isOpenSmiles, setOpenSmiles] = useState(false)

  /**
   * Добавить смайлик в текст
   */
  const handleAddEmoji = useCallback((emoji) => {
    setText((prev) => {
      /**
       * Позиция курсора в инпуте
       */
      const cursorPosition = textAreaRef?.current?.selectionStart

      const start = prev.substring(0, cursorPosition)
      const end = prev.substring(cursorPosition, prev.length)
      return start + emoji.native + end
    })
  }, [textAreaRef, setText])

  return (
    <>
      <div className={classnames(cn(), className)} ref={smilesRef}>
        <IconButton
          icon={icon}
          size="small"
          fill="oldAsphalt50"
          onClick={() => setOpenSmiles((prev) => !prev)}
        />
      </div>
      <Popup
        innerRef={smilesRef}
        // @ts-ignore
        open={isOpenSmiles}
        onClose={() => setOpenSmiles(false)}
      >
        <Picker {...smilePickerProps} onClick={handleAddEmoji} />
      </Popup>

    </>
  )
})

InputSmiles.defaultProps = {
  icon: 'smile',
  smilePickerProps: {
    set: 'apple',
    showPreview: false,
    showSkinTones: false,
  },
}
