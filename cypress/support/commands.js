// import 'cypress-file-upload'
import selectors from './common/selectors'
import storelocatorSelectors, { getAddressLink } from './selectors.js'

const storelocatorJson = '.storelocator.json'
const fileName = 'pickups.xls'

// Save pickupPoint
Cypress.Commands.add(
  'setPickupPointItem',
  (pickupPointItem, pickupPointValue) => {
    cy.readFile(storelocatorJson).then((items) => {
      items[pickupPointItem] = pickupPointValue
      cy.writeFile(storelocatorJson, items)
    })
  }
)

// Get pickupPoint
Cypress.Commands.add('getPickupPointItem', () => {
  cy.readFile(storelocatorJson).then((items) => {
    return items
  })
})

Cypress.Commands.add('visitStore', () => {
  cy.intercept('**/rc.vtex.com.br/api/events').as('events')
  cy.qe("Visit stores page")
  cy.visit('/stores')
  cy.wait('@events')

  cy.get(selectors.ProfileLabel, { timeout: 20000 })
    .should('be.visible')
    .should('have.contain', `Hello,`)
})

Cypress.Commands.add('verifyPickupPointsInStore', () => {
  cy.getVtexItems().then((vtex) => {
    cy.intercept('POST', `${vtex.baseUrl}/**`, (req) => {
      if (req.body.operationName === 'Session') {
        req.continue()
      }
    }).as('Session')
    cy.visitStore()
    cy.wait('@Session', { timeout: 40000 })
    cy.get(storelocatorSelectors.LoadStores).should('be.visible').click()
    cy.get(storelocatorSelectors.VtexStoreName).contains('pickup example 1')
    cy.get(storelocatorSelectors.VtexStoreName).contains('pickup example 2')
  })
})

Cypress.Commands.add('uploadXLS', () => {
  cy.qe("Visit admin pickup point page")
  cy.visit('/admin/app/pickup-points')
  cy.get(storelocatorSelectors.VtexButton).first().should('be.visible')
  cy.qe("Click on Upload a XLS button")
  cy.contains('Upload a XLS').click()
  cy.qe("Upload a file to add multiple pickup point")
  cy.get(storelocatorSelectors.UploadInput).attachFile(fileName)
  cy.qe("Close the layout")
  cy.get(storelocatorSelectors.CloseIcon).should('be.visible').click()
  cy.get(storelocatorSelectors.VtexAlert, { timeout: 15000 }).should(
    'be.visible'
  )
})

Cypress.Commands.add('verifyDetailsInDetailPage', () => {
  cy.get(storelocatorSelectors.VtexStoreName).then(($els) => {
    const storeLocatorsNames = [...$els].map((el) => el.innerText)
    const indexOfNsmr = storeLocatorsNames.indexOf('pickup example 2')

    cy.get(getAddressLink(indexOfNsmr)).click()
    cy.get(storelocatorSelectors.HoursContainer).should('be.visible')
  })
})
