import { useState } from 'react'
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import Filter from '@components/filter/Filter'
import MovieCard from '@components/movies/MovieCard'
import SearchMovies from '@components/search/SearchMovies'
import { saveMovies } from '@controllers/movie-controller'
import { Movie } from '@custom-types/api/tmdb/search/movie'

export type MoviesCardsProps = {
  moviesData: Set<Movie>
  setMoviesData: React.Dispatch<React.SetStateAction<Set<Movie>>>
}

const MoviesCards = ({ moviesData, setMoviesData }: MoviesCardsProps) => {
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    setSaving(true)
    saveMovies().finally(() => setSaving(false))
  }

  const handleDelete = (movieId: Movie['id']) => {
    setMoviesData(
      (prev) => new Set([...prev].filter(({ id }) => id !== movieId)),
    )
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
              disabled={saving}
            >
              {saving ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    className="me-1"
                  />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
          <SearchMovies setMoviesData={setMoviesData} />
          <Filter moviesData={moviesData} />
        </>
      )}
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {[...moviesData].map((movie, index) => (
          <Col key={index} className="mb-1">
            <MovieCard movie={movie} onDelete={() => handleDelete(movie.id)} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MoviesCards
