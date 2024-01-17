import classNames from 'classnames'
import { useId, useState } from 'react'
import { FormCheck } from 'react-bootstrap'
import { Movie } from '@custom-types/movies'

type MovieItemProps = {
  movie: Movie
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const [checked, setChecked] = useState(true)
  const id = useId()

  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <li className="list-inline-item mb-2">
      <FormCheck
        type="checkbox"
        name="movie"
        id={id}
        value={movie}
        className="btn-check"
        checked={checked}
        onChange={handleChange}
      />
      <FormCheck.Label
        htmlFor={id}
        className={classNames('btn', {
          'btn-outline-secondary': !checked,
          'btn-secondary': checked,
        })}
      >
        {movie}
      </FormCheck.Label>
    </li>
  )
}

export default MovieItem
