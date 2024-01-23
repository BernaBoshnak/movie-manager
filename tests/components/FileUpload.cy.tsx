import { mount } from 'cypress/react18'
import App from '@components/App'
import ErrorContextProvider from '@components/context/ErrorContext'

describe('<FileUpload />', () => {
  beforeEach(() => {
    mount(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>,
    )
    cy.findByTestId('upload-form').as('uploadForm')
  })

  it('should have the correct text', () => {
    cy.get('@uploadForm').within(() => {
      cy.findByText(
        /please upload a text file containing movie names, each in a new line for processing\./i,
      )
    })
  })

  it('should attach a valid *.txt file', () => {
    cy.findByRole('button', { name: /submit/i }).should('be.disabled')
    cy.get('@uploadForm').within(() => {
      cy.fixture('movies.txt').as('file')
      cy.findByLabelText(/upload file/i).selectFile('@file', { force: true })
    })
    cy.findByRole('button', { name: /submit/i }).should('be.enabled')
  })
})
