
it('Load Json Files data', () => {
    cy.fixture('users/reporter.json').then((json) => {
        //verify data in users
        cy.intercept('GET', '/users/**', json).as('userJsontest')
        
      });
})