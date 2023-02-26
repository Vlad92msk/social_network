import React from 'react'
import { useWriteText, WriteTextType } from '@shared/hooks'

export const WriteText: React.FC<WriteTextType> = (props) => {
  const { myText, myDelay, speed, repeatCount } = props
  return <>{useWriteText({ myText, repeatCount, myDelay, speed })}</>
}
