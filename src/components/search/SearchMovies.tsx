import { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownMenu, Form } from 'react-bootstrap'
import { MoviesCardsProps } from '@components/movies/MoviesCards'
import SearchMovieItem from '@components/search/SearchMovieItem'
import { Movie, MovieResponse } from '@custom-types/api/tmdb/search/movie'
import { getJson } from '@utils/fetch'

const SearchMovies = ({
  setMoviesData,
}: {
  setMoviesData: MoviesCardsProps['setMoviesData']
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [searchResults, setSearchResults] = useState<Set<Movie>>(new Set())
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

    const searchValue = searchInput.value.trim()
    if (!searchValue.length) {
      setSearchResults(new Set())
      return
    }

    const api = import.meta.env.VITE_REACT_APP_TMDB_API_ENDPOINT
    const accessToken = import.meta.env.VITE_REACT_APP_TMDB_ACCESS_TOKEN

    const urlParams = new URLSearchParams({
      query: searchValue,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
    })
    const url = `${api}/search/movie?${urlParams.toString()}`
    const controller = new AbortController()
    controllersRef.current.add(controller)

    try {
      const data = await getJson<MovieResponse>(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      })

      if (data.results.length < 0) {
        return
      }

      setSearchResults(new Set(data.results))
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

  const handleToggle = (isOpen: boolean) => {
    if (!isOpen) {
      setSearchResults(new Set())
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
      />
      <Dropdown
        onToggle={handleToggle}
        autoClose="outside"
        show={searchResults.size > 0}
        onSelect={handleSelect}
      >
        <DropdownMenu className="w-100">
          {[...searchResults].map((movie) => (
            <SearchMovieItem key={movie.id} movie={movie} />
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default SearchMovies
