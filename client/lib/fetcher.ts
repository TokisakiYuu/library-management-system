import axios from 'axios'

export const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:8080'
})

const fetcher = (url: string) => axiosIns.get(url).then(res => res.data)

export default fetcher
