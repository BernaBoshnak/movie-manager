import { Button, Card } from 'react-bootstrap'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieCard = () => {
  return (
    <Card>
      <Card.Img variant="top" src="https://placehold.co/600x400" alt="batman" />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>Card text</Card.Text>
        <div className="text-end">
          <Button variant="danger" size="sm">
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="visually-hidden">Delete Batman</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default MovieCard
