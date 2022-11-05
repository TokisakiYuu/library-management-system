import { Request, Response } from 'express'
import { books } from '../data/books'

export default (req: Request, res: Response): void => {
  const { id } = req.query
  const index = books.findIndex(book => book._id === id as string)
  if (index >= 0) {
    books.splice(index, 1)
  }
  res.end()
}
