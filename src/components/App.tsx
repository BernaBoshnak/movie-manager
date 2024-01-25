import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ErrorContextProvider from '@components/context/ErrorContext'
import FileUpload from '@components/FileUpload'
import MoviesList from '@components/movies/MoviesList'
import { MoviesNames } from '@custom-types/movies'
import '@styles/style.scss'

const App = () => {
  const [movies, setMovies] = useState<MoviesNames>(new Set())

  return (
    <ErrorContextProvider>
      <Container>
        <Row className="mx-2 mt-4">
          <Col className="shadow p-5 bg-body-tertiary">
            {movies.size === 0 ? (
              <FileUpload setMovies={setMovies} />
            ) : (
              <MoviesList movies={movies} />
            )}
          </Col>
        </Row>
      </Container>
    </ErrorContextProvider>
  )
}

export default App
