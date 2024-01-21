import { Dropdown } from 'react-bootstrap'
import { MovieCardProps } from '@components/movies/MovieCard'

const SearchMovieItem = ({ movie }: Pick<MovieCardProps, 'movie'>) => (
  <Dropdown.Item as="li" role="button" eventKey={movie.id.toString()}>
    <img
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
          : '/img/fallback.jpg'
      }
      alt={`"${movie.title}" movie title`}
      className="search-dropdown-item-img me-3"
    />
    {movie.title} <i>({movie.release_date})</i>
  </Dropdown.Item>
)

export default SearchMovieItem
