import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useBooks, Book } from '@/lib/hooks/books'
import { useCategory } from '@/lib/hooks/category'
import { axiosIns } from '@/lib/fetcher'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchCategory, setSearchCategory] = useState<string[]>([])
  const books = useBooks()
  const categories = useCategory()
  const router = useRouter()
  const search = async () => {
    setSearchedBooks(await axiosIns.get(`/books?keyword=${searchKeyword}&category=${searchCategory.join(',')}`).then(res => res.data) as Book[])
  }
  const toChangeSearchCategory = (value: string, checked: boolean) => {
    checked
      ? setSearchCategory(Array.from((new Set(searchCategory)).add(value)))
      : setSearchCategory(searchCategory.filter(category => category !== value))
  }
  return (
    <div>
      <Head>
        <title>图书管理系统</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>图书管理系统</h2>
        <h3>
          <span>图书列表</span>
          <button onClick={() => router.push('/addBook')} style={{ marginLeft: 10 }}>添加图书</button>
        </h3>
        {books.length
          ? (
            <ul className={styles.books}>
              {books.map(book => (
                <li className={styles.bookItem} key={book._id} onClick={() => router.push(`/book/${book._id}`)}>
                  《{book.name}》 {book.author}  {book.rating}分
                </li>
              ))}
            </ul>
          )
          : <p className={styles.noneTip}>无图书</p>
        }
        <h3>
          <span>搜索图书</span>
        </h3>
        <label>
          <span>关键字</span>
          <input
            className={styles.bookNameSearch}
            placeholder='输入书名后回车'
            value={searchKeyword}
            onInput={e => setSearchKeyword(e.currentTarget.value)}
          />
        </label>
        <div>
          <span>分类</span>
          {categories.map(category => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                checked={searchCategory.includes(category)}
                onChange={e => toChangeSearchCategory(category, e.currentTarget.checked)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
        <div>
          <button className='btn' onClick={search}>搜索</button>
        </div>
        {searchedBooks.length
          ? (
            <ul className={styles.books}>
              {searchedBooks.map(book => (
                <li key={book._id}>
                  《{book.name}》 {book.author}  {book.rating}分
                </li>
              ))}
            </ul>
          )
          : <p className={styles.noneTip}>无搜索结果</p>
        }
      </main>
    </div>
  )
}
