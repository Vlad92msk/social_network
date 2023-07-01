import { cookies } from 'next/headers'
import { DEFAULT_LOCALE } from '../../middleware'


export const getLocale = () => {
  const cookieStore = cookies()
  return cookieStore.get('locale')?.value || DEFAULT_LOCALE
}
