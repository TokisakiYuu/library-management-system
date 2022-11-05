import { Request, Response } from 'express'
import { faker } from '@faker-js/faker/locale/zh_CN'
import { books } from '../data/books'

export default (req: Request, res: Response): void => {
  const data = req.body
  books.push({
    _id: faker.datatype.uuid(),
    ...data
  })
  res.end()
}
