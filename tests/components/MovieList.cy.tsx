import { mount } from 'cypress/react18'
import App from '@components/App'
import ErrorContextProvider from '@components/context/ErrorContext'
import * as movieController from '@controllers/movie-controller'
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
    cy.wait('@getGenres')
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

  it('edits the movie card title and description', () => {
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          cy.intercept('GET', `**/search/movie?query=Movie+${movie.id}*`, {
            body: { results: [movie] },
            statusCode: 200,
          }).as(`getMovies${movie.id}`)
        })

        cy.intercept('GET', '**/genre/movie/list**', {
          fixture: '/api/genres.json',
          statusCode: 200,
        }).as('getGenres')

        // Uncheck the first and second movie
        cy.findByLabelText(/movie 1/i).click({ force: true })
        cy.findByLabelText(/movie 2/i).click({ force: true })
        cy.findByRole('button', { name: /search/i }).click()
        cy.wait('@getGenres')

        cy.findByTestId('movie-card').within(() => {
          cy.findByTestId('card-title').as('title')
          // The title and description are not editable
          cy.findByTestId('card-description').as('description')
          cy.get('@title').should('have.attr', 'contenteditable', 'false')
          cy.get('@description').should('have.attr', 'contenteditable', 'false')
          cy.findByRole('button', { name: /edit/i }).as('editBtn')
          cy.get('@editBtn').click()
          // The title and description are now editable
          cy.get('@title').should('have.attr', 'contenteditable', 'true')
          cy.get('@description').should('have.attr', 'contenteditable', 'true')
          cy.get('@title').clear()
          cy.get('@title').type('ABC')
          cy.get('@description').clear()
          cy.get('@description').type('DEF')
          cy.get('@editBtn').click()
          // The title and description are no longer editable
          cy.get('@title').should('have.attr', 'contenteditable', 'false')
          cy.get('@description').should('have.attr', 'contenteditable', 'false')
        })
        cy.spy(movieController, 'saveMovies').as('saveMovies')
        cy.findByRole('button', { name: /save/i }).click()
        // Verify that the state of movies has changed
        cy.get('@saveMovies').should('be.calledWith', [
          { ...movies[2], title: 'ABC', overview: 'DEF' },
        ])
      },
    )
  })

  it('deletes movie card', () => {
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

    // Uncheck the second and third movie
    cy.findByLabelText(/movie 2/i).click({ force: true })
    cy.findByLabelText(/movie 3/i).click({ force: true })
    cy.findByRole('button', { name: /search/i }).click()
    cy.wait('@getGenres')

    cy.findByTestId('movie-card').within(() => {
      cy.findByTestId('card-title').as('title')
      cy.get('@title')
      cy.findByRole('button', { name: /delete/i }).as('deleteBtn')
      cy.get('@deleteBtn').click()
      cy.get('@title').should('not.exist')
    })
  })

  it('search for a movie through an input using dropdown', () => {
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

    // Uncheck the first movie
    cy.findByLabelText(/movie 1/i).click({ force: true })
    cy.findByRole('button', { name: /search/i }).as('searchBtn')
    cy.get('@searchBtn').click()
    cy.wait('@getGenres')

    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        cy.findByTestId('movies-cards').within(() => {
          cy.findByText(movies[0].title).should('not.exist')
        })
        cy.intercept('GET', '**/search/movie**', {
          body: { results: movies },
          statusCode: 200,
          delay: 100,
        }).as('getMovies')
        cy.findByTestId('movies-dropdown-menu').should('not.exist')
        cy.findByRole('searchbox').type('M')
        cy.wait('@getMovies')
        cy.findByTestId('movies-dropdown-menu').within(() => {
          cy.findByText(movies[0].title).click()
        })
        cy.findByTestId('movies-cards').within(() => {
          cy.findByText(movies[0].title)
        })
      },
    )
  })

  it.skip('should filter movies by language', () => {})
  it.skip('should filter movies by genre', () => {})
  it.skip('should sort movies by popularity', () => {})
  it.skip('should display an alert message on error', () => {})
})
