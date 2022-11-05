import { Request, Response } from 'express'
import { books } from '../data/books'

export default (req: Request, res: Response): void => {
  const { id } = req.query
  res.json(books.find(book => book._id === id as string))
}
