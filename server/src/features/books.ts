import { Request, Response } from 'express'
import { books, Book } from '../data/books'

export default (req: Request, res: Response): void => {
  const { keyword, category } = req.query
  const isSearch = ('keyword' in req.query) && (typeof keyword === 'string')
  if (isSearch) {
    const categories = (category as string).split(',').filter(c => !!c)
    res.json(
      searchBookWithCategories(
        searchBookWithKeyword(books, keyword),
        categories
      )
    )
  } else {
    res.json(books)
  }
}

function searchBookWithKeyword(books: Book[], keyword: string) {
  if (!keyword) return []
  return books.filter(book => book.name.toLowerCase().includes(keyword))
}

function searchBookWithCategories(books: Book[], categories: string[]) {
  if (!categories.length) return books
  return books.filter(book => (new Set([...book.category, ...categories]).size < book.category.length + categories.length))
}
