import { classnames } from '@bem-react/classnames'
import React, { useCallback } from 'react'
import { IconName } from '@public/models/icon.model'
import { IconFill } from '@shared/components/Icon'
import { IconButton } from '@shared/components/IconButton'
import { Text } from '@shared/components/Text'
import { useRect } from '@shared/hooks'
import { makeCn } from '@shared/utils'

import styles from './TextInput.module.scss'


const cn = makeCn('TextInput', styles)

type InputType = (
  'button' /* Кнопка */
  | 'checkbox' /* Флажки. Позволяют выбрать более одного варианта из предложенных. */
  | 'file' /* Поле для ввода имени файла, который пересылается на сервер. */
  | 'hidden' /* Скрытое поле. Оно никак не отображается на веб-странице. */
  | 'image' /* Поле с изображением. При нажатии на рисунок данные формы отправляются на сервер. */
  | 'password' /* Обычное текстовое поле, но отличается от него тем, что все символы показываются звездочками. */
  | 'radio' /* Переключатели. Используются, когда следует выбрать один вариант из нескольких предложенных. */
  | 'reset' /* Кнопка для возвращения данных формы в первоначальное значение. */
  | 'submit' /* Кнопка для отправки данных формы на сервер. */
  | 'text' /* Текстовое поле. Предназначено для ввода символов с помощью клавиатуры. */
  | 'color' /* Виджет для выбора цвета. */
  | 'date' /* Поле для выбора календарной даты. */
  | 'datetime' /* Указание даты и времени. */
  | 'datetime-local' /* Указание местной даты и времени. */
  | 'email' /* Для адресов электронной почты. */
  | 'number' /* Ввод чисел. */
  | 'range' /* Ползунок для выбора чисел в указанном диапазоне. */
  | 'search' /* Поле для поиска. */
  | 'tel' /* Для телефонных номеров. */
  | 'time' /* Для времени. */
  | 'url' /* Для веб-адресов. */
  | 'month' /* Выбор месяца. */
  | 'week' /* Выбор недели. */
  )


export interface TextInputProps {
  className?: string;
  innerRef?: React.MutableRefObject<HTMLDivElement>;
  style?: React.CSSProperties;

  type?: InputType;
  maxLength?: number;
  pattern?: string

  prefix?: string;

  icon?: IconName;
  iconPosition?: 'left' | 'right';
  iconFill?: IconFill;
  iconClick?: () => void;

  size?: 'small' | 'medium' | 'large' | 'inherit';
  error?: boolean | string;
  disabled?: boolean;
  placeholder?: string;

  name?: string;
  value: string;
  onChange: (value: string, name?: string) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
  const {
    className,
    innerRef,
    style,

    type,
    maxLength,
    pattern,

    prefix,

    icon,
    iconPosition,
    iconFill,
    iconClick,


    name,
    value,
    onChange,
    onClick,

    size,
    disabled,
    placeholder,
    error,
  } = props
  const [refWidth, ref] = useRect<HTMLDivElement>(['width'], false)


  const handleChange = useCallback(({ target: { value: nextValue } }) => {
    onChange(nextValue, name)
  }, [name, onChange])


  return (
    <div ref={innerRef} className={classnames(cn({ error }), className)} style={style} onClick={onClick}>
      {
        (icon || prefix) && (
          <div ref={ref} className={cn('PrefixBox', { iconPosition })}>
            {icon && <IconButton className={cn('Icon')} icon={icon} fill={iconFill} onClick={iconClick} />}
            {prefix && <Text className={cn('Prefix')} color="note" weight="medium">{prefix}</Text>}
          </div>
        )
      }
      <Text
        as="input"
        style={(icon || prefix) && ({
          [iconPosition === 'left' ? 'paddingLeft' : 'paddingRight']: (refWidth.width || 0) + 10,
        })}
        className={cn('Input', { size, error })}
        type={type}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}


TextInput.defaultProps = {
  className: null,
  placeholder: 'Введите значение...',
  type: 'text',
  size: 'medium',
  iconPosition: 'left',
  iconFill: 'oldAsphalt40',
}
