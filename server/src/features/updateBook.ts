import { Request, Response } from 'express'
import { books, Book } from '../data/books'

export default (req: Request, res: Response): void => {
  const data = req.body
  console.log(data);
  
  const { _id } = data as Book
  const index = books.findIndex(book => book._id === _id)
  if (index >= 0) {
    books.splice(index, 1, data)
    res.end()
  } else {
    res.sendStatus(404)
  }
}
