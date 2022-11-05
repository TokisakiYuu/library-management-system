import useSWR, { useSWRConfig } from 'swr'
import fetcher from '../fetcher'

export type Category = string

export function useCategory() {
  const { data } = useSWR<Category[]>('/category', fetcher)
  return data || []
}

export function useRefreshCategory() {
  const { mutate } = useSWRConfig()
  return mutate('/category')
}
