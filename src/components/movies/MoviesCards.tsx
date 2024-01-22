import { useState } from 'react'
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import Filter from '@components/filter/Filter'
import MovieCard from '@components/movies/MovieCard'
import SearchMovies from '@components/search/SearchMovies'
import { saveMovies } from '@controllers/movie-controller'
import { Movie, MovieId } from '@custom-types/api/tmdb/search/movie'

export type MoviesCardsProps = {
  moviesData: Record<MovieId, Movie>
  setMoviesData: React.Dispatch<React.SetStateAction<Record<MovieId, Movie>>>
}

const MoviesCards = ({ moviesData, setMoviesData }: MoviesCardsProps) => {
  const [filteredMoviesIds, setFilteredMoviesIds] = useState<Set<MovieId>>(
    new Set(),
  )
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    setSaving(true)
    saveMovies().finally(() => setSaving(false))
  }

  const handleDelete = (movieId: MovieId) => {
    setFilteredMoviesIds((prev) => {
      const newSet = new Set([...prev])
      newSet.delete(movieId)
      return newSet
    })
    setMoviesData((prev) => {
      const { [movieId]: _deleteMovieId, ...restMovies } = prev
      return restMovies
    })
  }

  return (
    <>
      {Object.keys(moviesData).length > 0 && (
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
          <Filter
            moviesData={moviesData}
            setFilteredMoviesIds={setFilteredMoviesIds}
          />
        </>
      )}
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {[...filteredMoviesIds].map((movieId) => (
          <Col key={movieId} className="mb-1">
            <MovieCard
              movie={moviesData[movieId]}
              onDelete={() => handleDelete(movieId)}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MoviesCards
