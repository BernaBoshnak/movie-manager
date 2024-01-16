import { Button, Form } from 'react-bootstrap'
import MovieItem from '@components/movies/MovieItem'
import { Movies } from '@custom-types/movies'

type MovieListProps = {
  movies: Movies
}

const MoviesList = ({ movies }: MovieListProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const moviesNodes = form['movie']

    if (!moviesNodes) {
      return
    }

    const movies = [...moviesNodes] as HTMLInputElement[]
    const checkedMovies = movies.filter((movie) => movie.checked)
    // eslint-disable-next-line
    const checkedMovieNames = checkedMovies.map((movie) => movie.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="fs-3 fw-medium text-center text-light-emphasis text-uppercase mb-3">
        Movies List
      </div>
      {movies.size > 0 ? (
        <>
          <ul className="list-unstyled mb-3">
            {Array.from(movies).map((movie, index) => (
              <MovieItem key={index} movie={movie} />
            ))}
          </ul>
          <div className="text-center">
            <Button type="submit" className="px-4 fs-5">
              Search
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-3 text-primary">No movies available</p>
      )}
    </Form>
  )
}

export default MoviesList
