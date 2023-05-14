/**
 * Универсальная утилита для форматирования номеров телефонов
 * @param value - Номер телефона
 * @param mask - Маска для форматирования
 * @returns Отформатированный номер телефона
 */
export const formatPhoneNumber = (value: string, mask: string): string => {
  let index = 0
  let formattedValue = ''

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') {
      if (index < value.length) {
        formattedValue += value[index]
        index++
      } else {
        break
      }
    } else {
      formattedValue += mask[i]
    }
  }

  return formattedValue
}
