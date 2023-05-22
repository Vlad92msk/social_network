import { classnames } from '@bem-react/classnames'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { PickerProps } from 'emoji-mart/dist-es'
import React, { useCallback, useRef, useState } from 'react'

import { IconButton } from '@public/components/IconButton'
import { Popup } from '@public/components/Popup'
import { IconName } from '@public/types/icon.model'
import { makeCn } from 'public/utils'
import styles from './InputSmiles.module.scss'
import { Icon } from "@public/components/Icon";


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


  const [isOpenSmiles, setOpenSmiles] = useState(false)

  /**
   * Добавить смайлик в текст
   */
  const handleAddEmoji = useCallback((emoji) => {
    if (textAreaRef?.current?.selectionStart) {
      setText((prev) => {
        /**
         * Позиция курсора в инпуте
         */
        const cursorPosition = textAreaRef?.current?.selectionStart

        const start = prev.substring(0, cursorPosition)
        const end = prev.substring(cursorPosition, prev.length)
        return start + emoji.native + end
      })
    }
  }, [textAreaRef, setText])

  return (
    <>
      <Popup
        state={{
          open: isOpenSmiles,
          onClose: () => setOpenSmiles(false),
          behavior: 'fixed',
        }}
      >
        <Popup.Button>
          <IconButton
              icon={icon!}
              onClick={() => setOpenSmiles((prev) => !prev)}
          />
        </Popup.Button>
        <Popup.Content>
          <Picker {...smilePickerProps} data={data} onEmojiSelect={console.log} onClick={handleAddEmoji} />
        </Popup.Content>
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
