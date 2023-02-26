import { classnames } from '@bem-react/classnames'
import React, { useCallback, useId, useState } from 'react'
import { makeCn } from '@shared/utils'
import styles from './Switch.module.scss'

const cn = makeCn('Switch', styles)

export interface SwitchOption<T = any> {
  groupName: string
  label: string
  value: T
}
export const enum SwitchType {
  VERTICAL='vertical',
  HORISONTAL='horisontal',
}
interface SwitchProps {
  className?: string
  options: SwitchOption[]
  type?: SwitchType
  startWith: SwitchOption['value']
  onChange: (selectValue: any) => void
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { className, options, startWith, onChange, type } = props
  const [result, setResult] = useState<SwitchOption['value']>(startWith)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setResult(value)
    onChange(value)
  }, [onChange])

  const uuid = useId()

  return (
    <div className={classnames(cn({ type }), className)}>
      {options.map(({ value, groupName, label }) => (
        <React.Fragment key={value}>
          <input
            onChange={handleChange}
            className={cn('RadioInput')}
            type="radio"
            value={value}
            name={uuid + groupName}
            id={String(uuid + groupName + value)}
            checked={result === value}
          />
          <label className={cn('RadioLabel')} htmlFor={String(uuid + groupName + value)}>
            {label}
          </label>
        </React.Fragment>
      ))}
    </div>
  )
}

Switch.defaultProps = {
  type: SwitchType.HORISONTAL,
}
