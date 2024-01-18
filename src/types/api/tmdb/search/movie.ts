import { Brand } from '@custom-types/utils'

type MovieId = Brand<number, 'MovieId'>

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: MovieId
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
