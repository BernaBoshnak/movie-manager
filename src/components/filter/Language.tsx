import { Card, ListGroup } from 'react-bootstrap'
import ListItem from '@components/filter/ListItem'
import { MoviesCardsProps } from '@components/movies/MoviesCards'

const Language = ({ moviesData }: Pick<MoviesCardsProps, 'moviesData'>) => {
  const languagesArr = [...moviesData].map((movie) => movie.original_language)
  const languages = new Set(languagesArr)

  return (
    <Card className="mb-3">
      <Card.Header>Language</Card.Header>
      <ListGroup variant="flush">
        {[...languages].map((language) => (
          <ListItem key={language} value={language} />
        ))}
      </ListGroup>
    </Card>
  )
}

export default Language
