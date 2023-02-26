/**
 * Создает строку для вывода сообщения
 * @param myEnum
 * @param text
 */
export const enumMessage = (myEnum: Record<string, any>, text = 'Значение может быть'): string => `${text}: ${Object.values(myEnum).join(', ')}.`
