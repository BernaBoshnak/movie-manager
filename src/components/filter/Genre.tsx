import { Card, ListGroup } from 'react-bootstrap'
import ListItem from '@components/filter/ListItem'
import { MoviesCardsProps } from '@components/movies/MoviesCards'

const Genre = ({ moviesData }: Pick<MoviesCardsProps, 'moviesData'>) => {
  const genresArr = Object.values(moviesData)
    .map((movie) => movie.genre_ids)
    .flat()
  const genres = new Set(genresArr)

  return (
    <Card className="mb-3">
      <Card.Header>Genre</Card.Header>
      <ListGroup variant="flush">
        {[...genres].map((genre) => (
          <ListItem
            key={genre}
            name="genre"
            value={genre.toString()}
            defaultChecked
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default Genre
