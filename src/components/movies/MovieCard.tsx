import classNames from 'classnames'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { MoviesCardsProps } from '@components/movies/MoviesCards'
import { Movie } from '@custom-types/api/tmdb/search/movie'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type MovieCardProps = {
  movie: Movie
  onDelete: () => void
} & Pick<MoviesCardsProps, 'setMoviesData'>

const MovieCard = ({ movie, setMoviesData, onDelete }: MovieCardProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLSpanElement, Element>,
    key: keyof Movie,
  ) => {
    setMoviesData((prev) => ({
      ...prev,
      [movie.id]: {
        ...prev[movie.id],
        [key]: e.target.textContent,
      },
    }))
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
            : '/img/fallback-lg.jpg'
        }
        alt={`"${movie.title}" movie title`}
      />
      <Card.Body>
        <Card.Title
          className={classNames('d-block', {
            'border border-warning bg-warning-subtle': isEditing,
          })}
          contentEditable={isEditing}
          onBlur={(e) => handleBlur(e, 'title')}
          suppressContentEditableWarning
        >
          {movie.title}
        </Card.Title>
        <Card.Text
          className={classNames('d-block', {
            'border border-warning bg-warning-subtle': isEditing,
          })}
          contentEditable={isEditing}
          onBlur={(e) => handleBlur(e, 'overview')}
          suppressContentEditableWarning
        >
          {movie.overview}
        </Card.Text>
        <div className="text-end">
          <Button
            variant="warning"
            size="sm"
            className="me-2"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPencil} />
            <span className="visually-hidden">
              Edit &quot;{movie.title}&rdquo;
            </span>
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="visually-hidden">
              Delete &quot;{movie.title}&rdquo;
            </span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default MovieCard
