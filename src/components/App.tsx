import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FileUpload from '@components/FileUpload'
import '@styles/style.scss'

const App = () => {
  const [movies, setMovies] = useState<Set<string>>(new Set())

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center mx-2 h-100">
        <Col md={6} className="shadow p-5 bg-body-tertiary">
          <FileUpload setMovies={setMovies} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
