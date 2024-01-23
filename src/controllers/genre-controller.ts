import { Genres } from '@custom-types/api/tmdb/genre'
import { getJson } from '@utils/fetch'

export const getGenres = (
  urlParams: URLSearchParams,
  controller?: AbortController,
) => {
  const api = import.meta.env.VITE_REACT_APP_TMDB_API_ENDPOINT
  const accessToken = import.meta.env.VITE_REACT_APP_TMDB_ACCESS_TOKEN
  const url = `${api}/genre/movie/list?${urlParams.toString()}`

  return getJson<Genres>(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal: controller?.signal,
  })
}
