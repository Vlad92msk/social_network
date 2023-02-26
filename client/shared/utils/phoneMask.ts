/**
 * Маска ввода номера телефона
 */
export const phoneMask = (value: string): string => {
  /**
   * (\d{0,3}) - сколько укажем столько совойств будет в Х
   * т.е. тут мы говорим что хотим получить то что введено с 0 по 3 символ
   * replace(/\D/g, '' - убирает все нестроковые значения
   */
  const [_, prefix, firstThree, two1, two2] = /(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value.replace(/\D/g, ''));
  return !firstThree ? prefix : `(${prefix})${firstThree ? ` ${firstThree}` : ''}${two1 ? `-${two1}` : ''}${two2 ? `-${two2}` : ''}`;
};
