import { Brand } from '@custom-types/utils'

export type GenreId = Brand<number, 'GenreId'>

export type Genre = {
  id: GenreId
  name: string
}

export type Genres = {
  genres: Genre[]
}
