import { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import MovieItem from '@components/movies/MovieItem'
import MoviesCards from '@components/movies/MoviesCards'
import { Movie, MovieResponse } from '@custom-types/api/tmdb/search/movie'
import { MoviesNames } from '@custom-types/movies'
import { getJson } from '@utils/fetch'

type MovieListProps = {
  movies: MoviesNames
}

const MoviesList = ({ movies }: MovieListProps) => {
  const [moviesData, setMoviesData] = useState<Set<Movie>>(new Set())
  const controllersRef = useRef<Set<AbortController>>(new Set())

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

    const api = import.meta.env.VITE_REACT_APP_TMDB_API_ENDPOINT
    const accessToken = import.meta.env.VITE_REACT_APP_TMDB_ACCESS_TOKEN

    checkedMovieNames.forEach(async (movieTitle) => {
      const urlParams = new URLSearchParams({
        query: movieTitle,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      })
      const url = `${api}/search/movie?${urlParams.toString()}`
      const controller = new AbortController()
      controllersRef.current.add(controller)

      try {
        const data = await getJson<MovieResponse>(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        })

        if (data.results.length < 0) {
          return
        }

        const [movie] = data.results
        const hasMovie = [...moviesData].some(({ id }) => id === movie.id)

        if (hasMovie) {
          return
        }

        setMoviesData((prev) => new Set([...prev, movie]))
      } catch (err) {
        // TODO
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
              disabled={moviesData.size > 0}
            />
          ))}
        </ul>
        {!moviesData.size && (
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
