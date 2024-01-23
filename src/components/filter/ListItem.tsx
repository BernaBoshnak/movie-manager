import { useId } from 'react'
import { Form, ListGroup, FormCheckProps } from 'react-bootstrap'

const ListItem = (props: FormCheckProps) => {
  const id = useId()

  return (
    <ListGroup.Item>
      <Form.Check id={id} {...props} />
    </ListGroup.Item>
  )
}

export default ListItem
