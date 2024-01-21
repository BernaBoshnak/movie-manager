import { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownMenu, Form } from 'react-bootstrap'
import { MoviesCardsProps } from '@components/movies/MoviesCards'
import SearchMovieItem from '@components/search/SearchMovieItem'
import { getMovies } from '@controllers/movie-controller'
import { Movie } from '@custom-types/api/tmdb/search/movie'

const SearchMovies = ({
  setMoviesData,
}: {
  setMoviesData: MoviesCardsProps['setMoviesData']
}) => {
  const [searchResults, setSearchResults] = useState<Set<Movie>>(new Set())
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const controllersRef = useRef<Set<AbortController>>(new Set())

  useEffect(() => {
    const controllers = controllersRef.current

    return () => {
      for (const controller of controllers) {
        controller.abort()
      }
    }
  }, [])

  const handleChange = async () => {
    const searchInput = searchInputRef.current
    if (!searchInput) {
      return
    }

    const value = searchInput.value.trim()

    if (!value.length) {
      setSearchResults(new Set())
      return
    }

    const urlParams = new URLSearchParams({
      query: value,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
    })
    const controller = new AbortController()
    controllersRef.current.add(controller)

    try {
      const { results: movies } = await getMovies(urlParams, controller)

      if (movies.length < 0) {
        return
      }

      setSearchResults(new Set(movies))
    } catch (err) {
      // TODO
    } finally {
      controllersRef.current.delete(controller)
    }
  }

  const handleSelect = (selectMovie: string | null) => {
    if (!selectMovie) {
      return
    }

    const selectedMovie = Array.from(searchResults).find(
      (movie) => movie.id.toString() === selectMovie,
    )

    if (selectedMovie) {
      setMoviesData((prev) => new Set([...prev, selectedMovie]))
      const searchInput = searchInputRef.current

      if (searchInput) {
        searchInput.value = ''
        setSearchResults(new Set())
      }
    }
  }

  return (
    <div className="mb-3">
      <Form.Text className="d-block text-center mb-2 fs-5" muted>
        Search for your favourite movies here.
      </Form.Text>
      <Form.Control
        ref={searchInputRef}
        type="search"
        placeholder="Type here..."
        onChange={handleChange}
        onFocus={() => setIsSearchInputFocused(true)}
        // the delay is required in order for the `onSelect` callback
        // to be fired before the dropdown is unmounted
        onBlur={() => setTimeout(() => setIsSearchInputFocused(false), 150)}
      />
      <Dropdown show onSelect={handleSelect}>
        {searchResults.size > 0 && isSearchInputFocused && (
          <DropdownMenu className="w-100">
            {[...searchResults].map((movie) => (
              <SearchMovieItem key={movie.id} movie={movie} />
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  )
}

export default SearchMovies
