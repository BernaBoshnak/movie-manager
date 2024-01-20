import { Row, Col, Button } from 'react-bootstrap'
import MovieCard from '@components/movies/MovieCard'
import SearchMovies from '@components/search/SearchMovies'
import { Movie } from '@custom-types/api/tmdb/search/movie'

export type MoviesCardsProps = {
  moviesData: Set<Movie>
  setMoviesData: React.Dispatch<React.SetStateAction<Set<Movie>>>
}

const MoviesCards = ({ moviesData, setMoviesData }: MoviesCardsProps) => {
  const handleSave = () => {
    // TODO
  }

  return (
    <>
      {moviesData.size > 0 && (
        <>
          <div className="text-center mb-3">
            <Button
              variant="primary"
              className="px-4 fs-5"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
          <SearchMovies setMoviesData={setMoviesData} />
        </>
      )}
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {[...moviesData].map((movie, index) => (
          <Col key={index} className="mb-1">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MoviesCards
