import { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import ListItem from '@components/filter/ListItem'

const Sort = () => {
  const orders = ['asc', 'desc'] as const
  type Order = (typeof orders)[number]
  const [order, setOrder] = useState<Order>('asc')

  const handleSortChange = (sortOrder: Order) => {
    setOrder(sortOrder)
  }

  return (
    <Card data-testid="order-card" className="mb-3">
      <Card.Header>Sort (by popularity)</Card.Header>
      <ListGroup variant="flush">
        {orders.map((o) => (
          <ListItem
            key={o}
            type="radio"
            name="order"
            label={o}
            value={o}
            onChange={() => handleSortChange(o)}
            checked={order === o}
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default Sort
