import { Button, Form } from 'react-bootstrap'
import MovieItem from '@components/movies/MovieItem'
import { Movies } from '@custom-types/movies'
import MoviesCards from './MoviesCards'

type MovieListProps = {
  movies: Movies
}

const MoviesList = ({ movies }: MovieListProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const form = e.target as HTMLFormElement
    // const moviesNodes = form['movie']

    // if (!moviesNodes) {
    //   return
    // }

    // const movies = [...moviesNodes] as HTMLInputElement[]
    // const checkedMovies = movies.filter((movie) => movie.checked)
    // const checkedMovieNames = checkedMovies.map((movie) => movie.value)
  }

  return (
    <>
      <Form onSubmit={handleSubmit} data-testid="movies-list-form">
        <h2 className="text-center text-light-emphasis text-uppercase mb-3">
          Movies List
        </h2>
        {movies.size > 0 ? (
          <>
            <ul className="list-unstyled mb-3">
              {Array.from(movies).map((movie, index) => (
                <MovieItem key={index} movie={movie} />
              ))}
            </ul>
            <div className="text-center mb-4">
              <Button type="submit" className="px-4 fs-5">
                Search
              </Button>
            </div>
          </>
        ) : (
          <p className="mt-3 text-primary">No movies available</p>
        )}
      </Form>
      <MoviesCards />
    </>
  )
}

export default MoviesList
