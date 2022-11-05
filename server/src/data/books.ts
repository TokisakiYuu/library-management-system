import { faker } from '@faker-js/faker/locale/zh_CN'
import _ from 'lodash'

export interface Book {
  _id: string,
  name: string
  author: string
  category: string[]
  rating: number
}

function genBook(): Book {
  return {
    _id: faker.datatype.uuid(),
    name: faker.helpers.unique(faker.music.songName),
    author: faker.name.firstName() + faker.name.lastName(),
    category: _.sampleSize(bookCategory, 2),
    rating: faker.datatype.number({ min: 1, max: 10, precision: 1 })
  }
}

function genCategory(): string {
  return faker.helpers.unique(faker.animal.type)
}

export const bookCategory = Array(5).fill(1).map(() => genCategory())
export const books = Array(20).fill(1).map(() => genBook())
