import { Dropdown } from 'react-bootstrap'
import { MovieCardProps } from '@components/movies/MovieCard'

const SearchMovieItem = ({ movie }: { movie: MovieCardProps['movie'] }) => (
  <Dropdown.Item as="li" eventKey={movie.id.toString()}>
    <img
      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
      alt={movie.title}
      className="search-dropdown-item-img me-3"
    />
    {movie.title} <i>({movie.release_date})</i>
  </Dropdown.Item>
)

export default SearchMovieItem
