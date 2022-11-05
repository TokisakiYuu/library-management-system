import useSWR, { useSWRConfig } from 'swr'
import fetcher from '../fetcher'

export interface Book {
  _id: string,
  name: string
  author: string
  category: string[]
  rating: number
}

export function useBooks() {
  const { data } = useSWR<Book[]>('/books', fetcher)
  return data || []
}

export function useRefreshBooks() {
  const { mutate } = useSWRConfig()
  return mutate('/books')
}
