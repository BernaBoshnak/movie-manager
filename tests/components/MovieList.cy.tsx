import { mount } from 'cypress/react18'
import App from '@components/App'
import ErrorContextProvider from '@components/context/ErrorContext'
import { MovieResponse } from '@custom-types/api/tmdb/search/movie'

describe('<MovieList />', () => {
  beforeEach(() => {
    mount(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>,
    )
    cy.findByTestId('upload-form').within(() => {
      cy.fixture('movies.txt').as('file')
      cy.findByLabelText(/upload file/i).selectFile('@file', { force: true })
    })
    cy.findByRole('button', { name: /submit/i }).click()
  })

  it('should upload a valid *.txt file and render the movies names', () => {
    cy.findByRole('heading', { name: /movies list/i })
    cy.findAllByLabelText(/movie \d+/i)
      .should('be.checked')
      .and('have.length', 3)
  })

  it('should load uploaded movies data and list cards', () => {
    // Verify that no movies are displayed
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        cy.findByTestId('movies-cards').within(() => {
          movies.forEach((movie) => {
            cy.findByText(movie.title).should('not.exist')
          })
        })
      },
    )

    // TODO
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          cy.intercept('GET', `**/search/movie?query=Movie+${movie.id}*`, {
            body: { results: [movie] },
            statusCode: 200,
          }).as(`getMovies${movie.id}`)
        })
      },
    )
    cy.intercept('GET', '**/genre/movie/list**', {
      fixture: '/api/genres.json',
      statusCode: 200,
    }).as('getGenres')

    cy.findByRole('button', { name: /search/i }).as('searchBtn')
    cy.get('@searchBtn').click()
    cy.get('@searchBtn').should('not.exist')
    cy.findByText(/search for your favourite movies here/i)

    // Verify that movies are displayed
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        cy.findByTestId('movies-cards').within(() => {
          movies.forEach((movie) => {
            cy.findByText(movie.title)
            cy.findByText(movie.overview)
          })
        })
      },
    )
  })

  it.skip('edits the movie card title and description', () => {})
  it.skip('deletes movie card', () => {})
  it.skip('search for a movie through an input using dropdown', () => {})
  it.skip('should filter movies by language', () => {})
  it.skip('should filter movies by genre', () => {})
  it.skip('should sort movies by popularity', () => {})
  it.skip('should display an alert message on error', () => {})
})
