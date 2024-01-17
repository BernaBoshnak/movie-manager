import { Row, Col } from 'react-bootstrap'
import MovieCard from '@components/movies/MovieCard'

const MoviesCards = () => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-3">
      {[null, null, null, null, null].map(() => (
        <Col className="mb-1">
          <MovieCard />
        </Col>
      ))}
    </Row>
  )
}

export default MoviesCards
