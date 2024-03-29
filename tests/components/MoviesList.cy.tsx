import { mount } from 'cypress/react18'
import App from '@components/App'
import * as movieController from '@controllers/movie-controller'
import { Movie, MovieResponse } from '@custom-types/api/tmdb/search/movie'

describe('<MovieList />', () => {
  const uploadFile = (movieFile: `${string}.txt` = 'movies.txt') => {
    cy.findByTestId('upload-form').within(() => {
      cy.fixture(movieFile).as('file')
      cy.findByLabelText(/upload file/i).selectFile('@file', { force: true })
    })
    cy.findByRole('button', { name: /submit/i }).click()
  }

  beforeEach(() => {
    mount(<App />)
  })

  const genresIntercept = (
    response: Parameters<typeof cy.intercept>[2] = {
      fixture: '/api/genres.json',
      statusCode: 200,
    },
  ) => {
    cy.intercept('GET', '**/genre/movie/list**', response).as('getGenres')
  }

  const movieIntercept = (movie: Movie) => {
    cy.intercept('GET', `**/search/movie?query=Movie+${movie.id}*`, {
      body: { results: [movie] },
      statusCode: 200,
    })
  }

  it('should show heading', () => {
    uploadFile()
    cy.findByRole('heading', { name: /movies list/i })
  })

  describe('valid *.txt file', () => {
    afterEach(() => {
      cy.fixture('/api/movies.json').then(
        ({ results: movies }: MovieResponse) => {
          movies.forEach((movie) => {
            movieIntercept(movie)
          })
        },
      )

      cy.findByRole('button', { name: /search/i }).as('searchBtn')
      cy.get('@searchBtn').click()
      cy.get('@searchBtn').should('not.exist')
      cy.findByRole('button', { name: /save/i })
    })

    it('should render with well formatted files', () => {
      uploadFile()
      cy.findAllByLabelText(/^movie \d+$/i)
        .should('be.checked')
        .and('have.length', 3)
    })

    it('should render with file containing a single movie', () => {
      uploadFile('single-movie.txt')
      cy.findAllByLabelText(/^movie \d+$/i)
        .should('be.checked')
        .and('have.length', 1)
    })

    it('should render with names containing white space', () => {
      uploadFile('movies-with-whitespace.txt')
      cy.findAllByLabelText(/^movie \d+$/i)
        .should('be.checked')
        .and('have.length', 3)
    })
  })

  it('should load uploaded movies data and list cards', () => {
    uploadFile()
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

    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })
      },
    )
    genresIntercept()

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
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })

        genresIntercept()

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
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })
      },
    )
    genresIntercept()

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
    uploadFile()
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
    genresIntercept()

    // Uncheck the first movie
    cy.findByLabelText(/movie 1/i).click({ force: true })
    cy.findByRole('button', { name: /search/i }).click()
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

  it('should have all checkboxes checked on initial rendering', () => {
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })

        genresIntercept()

        cy.findByRole('button', { name: /search/i }).click()
        cy.wait('@getGenres')

        cy.findByTestId('language-card').within(() => {
          cy.findByText(/language/i)
          cy.findAllByRole('checkbox').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked')
          })
        })

        cy.findByTestId('genre-card').within(() => {
          cy.findByText(/genre/i)
          cy.findAllByRole('checkbox').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked')
          })
        })

        cy.findByTestId('order-card').within(() => {
          cy.findByText('Sort (by popularity)')
          cy.findByRole('radio', { name: /asc/i }).should('be.checked')
        })
      },
    )
  })

  it('should sort movies by popularity', () => {
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })

        genresIntercept()

        cy.findByRole('button', { name: /search/i }).click()
        cy.wait('@getGenres')

        cy.findByRole('radio', { name: /asc/i }).should('be.checked')
        cy.findByTestId('movies-cards').within(() => {
          cy.findAllByTestId('card-title').each(($title, index) => {
            const expectedTitle = `Lorem ipsum #${index + 1}`
            cy.wrap($title).should('have.text', expectedTitle)
          })
        })

        cy.findByRole('radio', { name: /desc/i }).click()
        cy.findByTestId('movies-cards').within(() => {
          cy.findAllByTestId('card-title').each(($title, index, $list) => {
            const expectedTitle = `Lorem ipsum #${$list.length - index}`
            cy.wrap($title).should('have.text', expectedTitle)
          })
        })
      },
    )
  })

  it('should filter movies by language', () => {
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })

        genresIntercept()

        cy.findByRole('button', { name: /search/i }).click()
        cy.wait('@getGenres')

        cy.findByRole('checkbox', { name: /en/i }).should('be.checked')
        cy.findAllByTestId('movies-cards').within(() => {
          cy.findByText('Lorem ipsum #1')
        })
        cy.findByRole('checkbox', { name: /en/i }).click()
        cy.findAllByTestId('movies-cards').within(() => {
          cy.findByText('Lorem ipsum #1').should('not.exist')
        })
      },
    )
  })

  it('should filter movies by genre', () => {
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })

        genresIntercept()

        cy.findByRole('button', { name: /search/i }).click()
        cy.wait('@getGenres')

        cy.findByRole('checkbox', { name: /comedy/i }).should('be.checked')
        cy.findAllByTestId('movies-cards').within(() => {
          cy.findByText('Lorem ipsum #2')
        })
        cy.findByRole('checkbox', { name: /comedy/i }).click()
        cy.findAllByTestId('movies-cards').within(() => {
          cy.findByText('Lorem ipsum #2').should('not.exist')
        })
      },
    )
  })

  it('should display an alert message on error', () => {
    uploadFile()
    cy.fixture('/api/movies.json').then(
      ({ results: movies }: MovieResponse) => {
        movies.forEach((movie) => {
          movieIntercept(movie)
        })
      },
    )

    const errorMessage = 'Fetching genres failed!'
    genresIntercept({
      statusCode: 404,
      body: { status_message: errorMessage },
    })

    cy.findByRole('alert').should('not.exist')
    cy.findByRole('button', { name: /search/i }).click()
    cy.wait('@getGenres')

    cy.findByRole('alert')
      .should('exist')
      .within(() => {
        cy.findByText(/error/i)
        cy.findByTestId('error-message').contains(errorMessage)
      })
    cy.findByRole('button', { name: /close alert/i }).click()
    cy.findByRole('alert').should('not.exist')
  })
})
