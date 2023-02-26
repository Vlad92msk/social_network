export type Tokenfield = 'hidden' | 'check'
export type OptionValue = string | number
export type SelectValue = OptionValue | Array<OptionValue> | null

export interface SelectContext {
  selectValue: SelectValue
  name?: string
  size?: string
  handleChange: (valueOption: OptionValue, optionName?: string) => void
  onChange: (value: SelectValue, name?: string) => void
  searchValue: string
  tokenfield?: Tokenfield
  optionValues: OptionValue[]
}
