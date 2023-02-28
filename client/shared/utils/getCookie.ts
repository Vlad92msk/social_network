export const getCookie = (name: string) => {
  if (typeof window === 'undefined') return null

  const matches = document?.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getCookies = (cookies: string): Record<string, string> => {
  const cookieObject: Record<string, string> = {}
  const cookieArray = cookies.split(';')
  cookieArray.forEach((cookie) => {
    const [key, value] = cookie.split('=')
    cookieObject[key.trim()] = value
  })
  return cookieObject
}
