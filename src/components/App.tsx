import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FileUpload from '@components/FileUpload'
import MoviesList from '@components/movies/MoviesList'
import { Movies } from '@custom-types/movies'
import '@styles/style.scss'

const App = () => {
  const [movies, setMovies] = useState<Movies>(new Set())

  return (
    <Container>
      <Row className="mx-2 mt-4">
        <Col className="shadow p-5 bg-body-tertiary">
          <div className="mb-4">
            <FileUpload setMovies={setMovies} />
          </div>
          <MoviesList movies={movies} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
