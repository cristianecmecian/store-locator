import { updateRetry } from './common/support'
import storeLocatorSelectors from './selectors.js'
import { INTIAL_PICKUP_POINTS_ENV } from './api_testcase'
import selectors from './common/selectors'

export function addPickUpPoint(pickPointName) {
  cy.qe("Visit admin pickup point page")
  cy.visit('/admin/app/pickup-points')
  cy.qe("Click on 'Add Pickup Point' Button")
  cy.get(storeLocatorSelectors.AddPickUpButton)
    .contains('Add Pickup Point')
    .click()
  cy.qe("Type a pickup point name")
  cy.get(selectors.PickUpPointName).clear().type(pickPointName)
  cy.qe("Type a pick point id")
  cy.get(selectors.PickUpPointId).should('be.visible').type('1')
  cy.qe("Select a country of USA")
  cy.get('select')
    .select('United States of America')
    .should('have.value', 'USA')
  /* eslint-disable cypress/no-unnecessary-waiting */
  cy.wait(1000)
  /* eslint-disable cypress/no-unnecessary-waiting */
  cy.qe("Type a pickup address")
  cy.get(selectors.PickUpAddress)
    .type('1279 Shinn Street Fremont CA,USA', { delay: 50 })
    .wait(500)
    .type('{downarrow}{enter}')
  cy.get(selectors.CheckBox).click()
  cy.get(selectors.WorkStartTime).eq(1).type('10:00')
  cy.get(selectors.WorkEndTime).eq(1).type('19:00')
  cy.qe("Save pickup Point address")
  cy.get(storeLocatorSelectors.SaveChanges).contains('Save Changes').click()
  cy.get(storeLocatorSelectors.ChangesSaved, { timeout: 10000 })
    .should('be.visible')
    .contains('Changes saved')
}

export function clickLoadAllStores() {
  cy.qe("Load all stores")
  cy.get('body').then(($body) => {
    if ($body.find(storeLocatorSelectors.LoadStores).length) {
      cy.get(storeLocatorSelectors.LoadStores, { timeout: 15000 })
        .should('be.visible')
        .click()
    }
  })
}

export function verifyAllPickUpPoint() {
  cy.visitStore()
  cy.get(storeLocatorSelectors.ListOfStores).should('be.visible')
  clickLoadAllStores()

  cy.getPickupPointItem().then((pickupCount) => {
    cy.qe("Verify all 4 Pickup points added")
    cy.get(storeLocatorSelectors.MoreItems).should(
      'have.length',
      pickupCount[INTIAL_PICKUP_POINTS_ENV] + 5
    )
    cy.get(storeLocatorSelectors.MoreItems)
      .its('length')
      .then((itemLen) => {
        for (let i = 0; i < itemLen; i++) {
          clickLoadAllStores()
          cy.get(storeLocatorSelectors.MoreItems)
            .eq(i)
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.get(storeLocatorSelectors.AddressContainer, {
            timeout: 20000,
          }).should('be.visible')
          cy.get(storeLocatorSelectors.HoursContainer).should('be.visible')
          cy.get(storeLocatorSelectors.BackToPickUpPoint)
            .should('be.visible')
            .click()
          cy.get(storeLocatorSelectors.MoreItems).should('be.visible')
        }
      })
  })
}

export function updateShippingPolicyStatus(status) {
  it('Link pickup point', updateRetry(2), () => {
    cy.visit('/admin/app/shipping-strategy/shipping-policy/?id=sha1920ede3r')
    cy.get('#name').should('be.visible')
    cy.get('body').then(($body) => {
      if (
        $body.find(storeLocatorSelectors.ShippingPolicyActiveStatus).length > 0
      ) {
        if (status === true) {
          cy.log('Shipping policy already in active status')
        } else {
          cy.get(storeLocatorSelectors.ShippingPolicyStatusToggle).click()
          cy.get(storeLocatorSelectors.ShippingPolicySaveChanges).click()
        }
      } else if (status === true) {
        cy.get(storeLocatorSelectors.ShippingPolicyStatusToggle).click()
        cy.get(storeLocatorSelectors.ShippingPolicySaveChanges).click()
      } else {
        cy.log('Shipping policy already in inactive status')
      }
    })
  })
}
