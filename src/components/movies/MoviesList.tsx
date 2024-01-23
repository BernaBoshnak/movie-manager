import { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useErrorContext } from '@components/context/ErrorContext'
import MovieItem from '@components/movies/MovieItem'
import MoviesCards from '@components/movies/MoviesCards'
import { getMovies } from '@controllers/movie-controller'
import { Movie, MovieId } from '@custom-types/api/tmdb/search/movie'
import { MoviesNames } from '@custom-types/movies'

type MovieListProps = {
  movies: MoviesNames
}

const MoviesList = ({ movies }: MovieListProps) => {
  const [moviesData, setMoviesData] = useState<Record<MovieId, Movie>>({})
  const controllersRef = useRef<Set<AbortController>>(new Set())
  const { setError } = useErrorContext()

  useEffect(() => {
    const controllers = controllersRef.current

    return () => {
      for (const controller of controllers) {
        controller.abort()
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const moviesNodes = form['movie']

    if (!moviesNodes) {
      return
    }

    const movies = [...moviesNodes] as HTMLInputElement[]
    const checkedMovies = movies.filter((movie) => movie.checked)
    const checkedMovieNames = checkedMovies.map((movie) => movie.value)

    checkedMovieNames.forEach(async (movieTitle) => {
      const urlParams = new URLSearchParams({
        query: movieTitle,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      })
      const controller = new AbortController()
      controllersRef.current.add(controller)

      try {
        const { results: movies } = await getMovies(urlParams, controller)
        if (movies.length < 0) {
          return
        }

        const [movie] = movies
        const hasMovie = Object.values(moviesData).some(
          ({ id }) => id === movie.id,
        )

        if (hasMovie) {
          return
        }

        setMoviesData((prev) => ({ ...prev, [movie.id]: movie }))
      } catch (err) {
        const error = err as Error
        setError(error.message)
      } finally {
        controllersRef.current.delete(controller)
      }
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit} data-testid="movies-list-form">
        <h2 className="text-center text-light-emphasis text-uppercase mb-3">
          Movies List
        </h2>
        <ul className="list-unstyled mb-3">
          {Array.from(movies).map((movie, index) => (
            <MovieItem
              key={index}
              movie={movie}
              disabled={Object.keys(moviesData).length > 0}
            />
          ))}
        </ul>
        {Object.keys(moviesData).length === 0 && (
          <div className="text-center">
            <Button type="submit" className="px-4 fs-5">
              Search
            </Button>
          </div>
        )}
      </Form>
      <MoviesCards moviesData={moviesData} setMoviesData={setMoviesData} />
    </>
  )
}

export default MoviesList
