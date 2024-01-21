import { useId } from 'react'
import { Form, ListGroup, FormCheckProps } from 'react-bootstrap'

type ListItemProps = {
  value: string
  type?: FormCheckProps['type']
  active?: boolean
  onClick?: () => void
}

const ListItem = ({ type, value, active, onClick }: ListItemProps) => {
  const id = useId()

  return (
    <ListGroup.Item action onClick={onClick}>
      <Form.Check
        type={type}
        id={type ? `default-${value}` : id}
        label={value}
        checked={active}
      />
    </ListGroup.Item>
  )
}

export default ListItem
