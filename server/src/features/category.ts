import { Request, Response } from 'express'
import { bookCategory } from '../data/books'

export default (req: Request, res: Response): void => {
  res.json(bookCategory)
}
