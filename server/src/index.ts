import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import booksHandler from './features/books'
import bookCategoryHandler from './features/category'
import addBookHandler from './features/addBook'
import deleteBookHandler from './features/deleteBook'
import updateBookHandler from './features/updateBook'
import bookHandler from './features/book'

dotenv.config()

const app = express()
const port = 8080

app
  .use(morgan('dev'))
  .use(cors())
  .use(express.json())
  .use(cookieParser())
  .get('/books', booksHandler)
  .get('/category', bookCategoryHandler)
  .post('/add_book', addBookHandler)
  .delete('/delete_book', deleteBookHandler)
  .put('/update_book', updateBookHandler)
  .get('/book', bookHandler)

app.listen(port, () => {
  console.log(`App started successfully on ${port}!`)
})
