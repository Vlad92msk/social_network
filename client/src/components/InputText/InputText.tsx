import { classnames } from '@bem-react/classnames'
import React, { ChangeEvent } from 'react'
import { RefType } from '@public/types/refType'
import { cn } from './cn'
import { Text, TextOwnProps } from '../Text'


// | 'button' /* Кнопка */
// | 'checkbox' /* Флажки. Позволяют выбрать более одного варианта из предложенных. */
// | 'file' /* Поле для ввода имени файла, который пересылается на сервер. */
// | 'hidden' /* Скрытое поле. Оно никак не отображается на веб-странице. */
// | 'image' /* Поле с изображением. При нажатии на рисунок данные формы отправляются на сервер. */
// | 'password' /* Обычное текстовое поле, но отличается от него тем, что все символы показываются звездочками. */
// | 'radio' /* Переключатели. Используются, когда следует выбрать один вариант из нескольких предложенных. */
// | 'reset' /* Кнопка для возвращения данных формы в первоначальное значение. */
// | 'submit' /* Кнопка для отправки данных формы на сервер. */
// | 'text' /* Текстовое поле. Предназначено для ввода символов с помощью клавиатуры. */
// | 'color' /* Виджет для выбора цвета. */
// | 'date' /* Поле для выбора календарной даты. */
// | 'datetime' /* Указание даты и времени. */
// | 'datetime-local' /* Указание местной даты и времени. */
// | 'email' /* Для адресов электронной почты. */
// | 'number' /* Ввод чисел. */
// | 'range' /* Ползунок для выбора чисел в указанном диапазоне. */
// | 'search' /* Поле для поиска. */
// | 'tel' /* Для телефонных номеров. */
// | 'time' /* Для времени. */
// | 'url' /* Для веб-адресов. */
// | 'month' /* Выбор месяца. */
// | 'week' /* Выбор недели. */;

export interface InputTextProps extends TextOwnProps, Partial<Omit<HTMLInputElement, 'size'>> {
  error?: boolean | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputText = React.forwardRef((props: InputTextProps, ref?: RefType<HTMLInputElement>) => {
  const {
    className,
    type = 'text',
    error,
    ...rest
  } = props

  return (
  // @ts-ignore
    <Text<'input'>
      ref={ref}
      {...rest}
      className={classnames(cn('Input', { error: Boolean(error) }), className)}
      type={type}
      as="input"
    />
  )
})
