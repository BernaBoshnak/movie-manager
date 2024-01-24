import { useEffect, useRef, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useErrorContext } from '@components/context/ErrorContext'
import ListItem from '@components/filter/ListItem'
import { MoviesCardsProps } from '@components/movies/MoviesCards'
import { getGenres } from '@controllers/genre-controller'
import { ApiError } from '@custom-types/api/tmdb/error'
import { Genre as TGenre, GenreId } from '@custom-types/api/tmdb/genre'

const Genre = ({ moviesData }: Pick<MoviesCardsProps, 'moviesData'>) => {
  const genresArr = Object.values(moviesData)
    .map((movie) => movie.genre_ids)
    .flat() as GenreId[]
  const genresIds = new Set<GenreId>(genresArr)
  const [genres, setGenres] = useState<Record<GenreId, TGenre>>({})
  const { setError } = useErrorContext()
  const controllersRef = useRef<Set<AbortController>>(new Set())

  useEffect(() => {
    const controllers = controllersRef.current

    return () => {
      for (const controller of controllers) {
        controller.abort()
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    controllersRef.current.add(controller)
    const urlParams = new URLSearchParams({
      language: 'en',
    })

    getGenres(urlParams, controller)
      .then(({ genres: genresData }) => {
        const genresObj = genresData.reduce<typeof genres>((prev, cur) => {
          prev[cur.id] = cur
          return prev
        }, {})

        setGenres(genresObj)
      })
      .catch((err: ApiError) => {
        setError(err.status_message)
      })
      .finally(() => {
        controllersRef.current.delete(controller)
      })
  }, [setError])

  return (
    <Card className="mb-3">
      <Card.Header>Genre</Card.Header>
      <ListGroup variant="flush">
        {[...genresIds].map((genreId) => (
          <ListItem
            key={genreId}
            name="genre"
            label={Object.keys(genres).length > 0 ? genres[genreId].name : null}
            value={genreId}
            defaultChecked
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default Genre
