import { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import ListItem from '@components/filter/ListItem'
import { MoviesCardsProps } from '@components/movies/MoviesCards'

const Sort = ({ moviesData }: Pick<MoviesCardsProps, 'moviesData'>) => {
  // eslint-disable-next-line no-console
  console.log('moviesData', moviesData)
  const [selectedSort, setSelectedSort] = useState('asc')

  const handleSortChange = (sortOrder: string) => {
    setSelectedSort(sortOrder)
  }

  return (
    <Card className="mb-3">
      <Card.Header>Genre</Card.Header>
      <ListGroup variant="flush">
        {['asc', 'desc'].map((order) => (
          <ListItem
            key={order}
            type="radio"
            value={order}
            onClick={() => handleSortChange(order)}
            active={selectedSort === order}
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default Sort
