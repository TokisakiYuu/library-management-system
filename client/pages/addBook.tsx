import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useCategory } from '@/lib/hooks/category'
import { axiosIns } from '@/lib/fetcher'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const categories = useCategory()
  const [selectedCategory, setSeletedCategory] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toChangeSearchCategory = (value: string, checked: boolean) => {
    checked
      ? setSeletedCategory(Array.from((new Set(selectedCategory)).add(value)))
      : setSeletedCategory(selectedCategory.filter(category => category !== value))
  }
  const submit = () => {
    if (!name) return alert('书名不能为空')
    if (!author) return alert('作者不能为空')
    setLoading(true)
    axiosIns
      .post('/add_book', { name, author, category: selectedCategory, rating })
      .then(res => res.data)
      .catch(e => alert((e as Error).message))
      .finally(() => {
        setLoading(false)
        router.back()
      })
  }
  return (
    <div>
      <Head>
        <title>添加图书 - 图书管理系统</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>添加图书</h2>
        <div>
          <label>
            <span>书名</span>
            <input type="text" value={name} onInput={e => setName(e.currentTarget.value)} />
          </label>
        </div>
        <div>
          <label>
            <span>作者</span>
            <input type="text" value={author} onInput={e => setAuthor(e.currentTarget.value)} />
          </label>
        </div>
        <div>
          <span>分类</span>
          {categories.map(category => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategory.includes(category)}
                onChange={e => toChangeSearchCategory(category, e.currentTarget.checked)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
        <div>
          <label>
            <span>评分</span>
            <input type="range" step={1} max={10} min={1} value={rating} onChange={e => setRating(Number(e.currentTarget.value))} />
            <span>{rating}</span>
          </label>
        </div>
        <div>
          <button onClick={submit} disabled={loading}>{loading ? '提交中' : '添加'}</button>
        </div>
      </main>
    </div>
  )
}
