import { Col, Form, Row } from 'react-bootstrap'
import Genre from '@components/filter/Genre'
import Language from '@components/filter/Language'
import Sort from '@components/filter/Sort'
import { MoviesCardsProps } from '@components/movies/MoviesCards'

const Filter = ({ moviesData }: Pick<MoviesCardsProps, 'moviesData'>) => {
  return (
    <Form>
      <Row xs={1} lg={3}>
        <Col>
          <Language moviesData={moviesData} />
        </Col>
        <Col>
          <Genre moviesData={moviesData} />
        </Col>
        <Col>
          <Sort moviesData={moviesData} />
        </Col>
      </Row>
    </Form>
  )
}

export default Filter
