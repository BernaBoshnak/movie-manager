import { Row, Col, Button } from 'react-bootstrap'
import MovieCard from '@components/movies/MovieCard'
import { Movie } from '@custom-types/api/tmdb/search/movie'

type MoviesCardsProps = {
  moviesData: Set<Movie>
}

const MoviesCards = ({ moviesData }: MoviesCardsProps) => {
  const handleSave = () => {
    // TODO
  }

  return (
    <>
      {moviesData.size > 0 && (
        <div className="text-center mb-3">
          <Button variant="primary" className="px-4 fs-5" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {[...moviesData].map((movie) => (
          <Col key={movie.id} className="mb-1">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MoviesCards
