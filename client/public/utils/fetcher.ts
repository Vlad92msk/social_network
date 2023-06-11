export const fetcher = async (url: string, method?: 'GET'| 'POST' | 'PUT' | 'DELETE') => {
  const response = await fetch(url, { method })

  if (!response.ok) throw new Error(`Произошла ошибка в запросе ${url}`)

  return response.json()
}
