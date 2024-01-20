import { Button, Card } from 'react-bootstrap'
import { Movie } from '@custom-types/api/tmdb/search/movie'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview}</Card.Text>
        <div className="text-end">
          <Button variant="danger" size="sm">
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="visually-hidden">Delete "{movie.title}"</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default MovieCard
