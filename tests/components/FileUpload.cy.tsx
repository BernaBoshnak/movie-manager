import { mount } from 'cypress/react18'
import App from '@components/App'

describe('<FileUpload />', () => {
  beforeEach(() => {
    mount(<App />)
    cy.findByTestId('upload-form').as('uploadForm')
    cy.findByRole('button', { name: /submit/i }).should('be.disabled')
  })

  it('should have a description text', () => {
    cy.get('@uploadForm').within(() => {
      cy.findByText(
        /please upload a text file containing movie names, each in a new line for processing\./i,
      )
    })
  })

  describe('*.txt file', () => {
    it('should attach a valid file', () => {
      cy.get('@uploadForm').within(() => {
        cy.fixture('movies.txt').as('file')
        cy.findByLabelText(/upload file/i).selectFile('@file', { force: true })
      })
      cy.findByRole('button', { name: /submit/i }).should('be.enabled')
    })

    it('should do nothing if the file is empty', () => {
      cy.get('@uploadForm').within(() => {
        cy.fixture('movies-empty-list.txt').as('file')
        cy.findByLabelText(/upload file/i).selectFile('@file', { force: true })
      })
      cy.findByRole('button', { name: /submit/i })
    })
  })
})
