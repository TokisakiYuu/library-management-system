import useSWR, { useSWRConfig } from 'swr'
import fetcher from '../fetcher'

export interface Book {
  _id: string,
  name: string
  author: string
  category: string[]
  rating: number
}

export function useBook(id: string) {
  const { data } = useSWR<Book>(`/book?id=${id}`, fetcher)
  return data || null
}
