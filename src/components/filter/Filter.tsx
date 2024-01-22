import { useEffect, useRef, useCallback } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Genre from '@components/filter/Genre'
import Language from '@components/filter/Language'
import Sort from '@components/filter/Sort'
import { Movie, MovieId } from '@custom-types/api/tmdb/search/movie'
import { getCheckedInputsValues } from '@utils/form'

type FilterProps = {
  moviesData: Record<MovieId, Movie>
  setFilteredMoviesIds: React.Dispatch<React.SetStateAction<Set<MovieId>>>
}

const Filter = ({ moviesData, setFilteredMoviesIds }: FilterProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const moviesCount = Object.keys(moviesData).length

  const handleChange = useCallback(
    (form: HTMLFormElement) => {
      const elements = Array.from(form.elements) as HTMLInputElement[]
      const languages = getCheckedInputsValues(elements, 'language')
      const genres = getCheckedInputsValues(elements, 'genre')
      const [order] = getCheckedInputsValues(elements, 'order')

      const filteredByLanguage = Object.values(moviesData).filter((movie) =>
        languages.includes(movie.original_language),
      )

      const filteredByGenre = [...filteredByLanguage].filter((movie) =>
        movie.genre_ids.some((genreId) => genres.includes(genreId.toString())),
      )

      const sortedMovies = [...filteredByGenre].sort((a, b) => {
        if (order === 'asc') {
          return a.popularity - b.popularity
        }

        if (order === 'desc') {
          return b.popularity - a.popularity
        }

        return 0
      })

      const moviesIds = sortedMovies.map((movie) => movie.id)

      setFilteredMoviesIds(new Set(moviesIds))
    },
    [moviesData, setFilteredMoviesIds],
  )

  useEffect(() => {
    if (moviesCount && formRef.current) {
      handleChange(formRef.current)
    }
  }, [moviesCount, handleChange])

  return (
    <Form ref={formRef} onChange={(e) => handleChange(e.currentTarget)}>
      <Row xs={1} lg={3}>
        <Col>
          <Language moviesData={moviesData} />
        </Col>
        <Col>
          <Genre moviesData={moviesData} />
        </Col>
        <Col>
          <Sort />
        </Col>
      </Row>
    </Form>
  )
}

export default Filter
