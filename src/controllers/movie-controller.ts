import { MovieResponse } from '@custom-types/api/tmdb/search/movie'
import { getJson } from '@utils/fetch'

export const saveMovies = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

export const getMovies = (
  urlParams: URLSearchParams,
  controller?: AbortController,
) => {
  const api = import.meta.env.VITE_REACT_APP_TMDB_API_ENDPOINT
  const accessToken = import.meta.env.VITE_REACT_APP_TMDB_ACCESS_TOKEN
  const url = `${api}/search/movie?${urlParams.toString()}`

  return getJson<MovieResponse>(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal: controller?.signal,
  })
}
