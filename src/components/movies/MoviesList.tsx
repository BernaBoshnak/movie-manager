import { useState } from 'react'
import {
  Button,
  Form,
  FormCheck,
  FormText,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'

type MovieListProps = {
  movies: Set<string>
}

const MoviesList = ({ movies }: MovieListProps) => {
  const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set())

  const handleCheckboxChange = (movieTitle: string) => {
    const updateSelectedMovies = new Set(selectedMovies)

    if (updateSelectedMovies.has(movieTitle)) {
      updateSelectedMovies.delete(movieTitle)
    } else {
      updateSelectedMovies.add(movieTitle)
    }

    setSelectedMovies(updateSelectedMovies)
  }

  return (
    <Form className="mt-4">
      <FormText className="d-block fs-3 fw-medium text-center text-light-emphasis text-uppercase">
        Movies List
      </FormText>
      {movies.size > 0 ? (
        <>
          <ListGroup as="ul" variant="flush" className="mb-3">
            {Array.from(movies).map((movie, index) => (
              <ListGroupItem as="li" key={index}>
                <FormCheck
                  type="checkbox"
                  className="btn-check"
                  id={`btn-check-${index}`}
                  checked={selectedMovies.has(movie)}
                  onChange={() => handleCheckboxChange(movie)}
                />
                <FormCheckLabel
                  htmlFor={`btn-check-${index}`}
                  className={`btn ${
                    selectedMovies.has(movie)
                      ? 'btn-outline-primary'
                      : 'btn-primary'
                  }`}
                >
                  {movie}
                </FormCheckLabel>
              </ListGroupItem>
            ))}
          </ListGroup>
          <Button className="d-block px-4 m-auto fs-5">Search</Button>
        </>
      ) : (
        <p className="mt-3 text-primary">No movies available</p>
      )}
    </Form>
  )
}

export default MoviesList
