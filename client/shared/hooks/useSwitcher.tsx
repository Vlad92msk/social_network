import React, { useMemo, useState } from 'react'
import { Switch, SwitchOption, SwitchType } from 'src/components'


interface UseSwitcher<T> {
  options: Omit<SwitchOption<T>, 'groupName'>[]
  className?: string
  type?: SwitchType
  groupName: string
  initial: T
}

export function useSwitcher <T>(param: UseSwitcher<T>):[T, JSX.Element] {
  const { initial, options, groupName, type, className } = param
  const [value, set] = useState(initial)

  const switcher = useMemo(() => (
    <Switch
      onChange={set}
      options={options.map((t) => ({ ...t, groupName }))}
      startWith={initial}
      type={type}
      className={className}
    />
  ), [groupName, initial, options, type])

  return ([value, switcher])
}
