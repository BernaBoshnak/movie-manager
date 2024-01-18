import { mount } from 'cypress/react18'
import App from '@components/App'

describe('File upload and movies list', () => {
  beforeEach(() => {
    mount(<App />)
    cy.findByTestId('upload-form').as('uploadForm')
    cy.get('@uploadForm').within(() => {
      cy.findByRole('button', { name: /submit/i }).should('be.disabled')
    })
  })

  describe('<FileUpload />', () => {
    it('should upload a valid *.txt file', () => {})

    it('should show "submit" button', () => {
      cy.get('@uploadForm').within(() => {
        cy.findByRole('button', { name: /submit/i })
      })
    })
  })

  describe('<MovieList />', () => {
    it('renders MoviesList when movies size is greater than 0', () => {
      cy.findByRole('heading', { name: /movies list/i }).should('not.exist')
    })
  })
})
