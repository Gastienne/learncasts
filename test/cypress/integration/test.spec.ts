// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.testRoute('/');
  });
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'Learncasts');
    //cy.fixture('users/reporter.json').as('reporterJson');
    cy.fixture('users/reporter.json').then((json) => {
      //verify data in users
      cy.intercept('GET', '/users/**', json).as('userJsontest')
    });
    cy.request('https://reqres.in')
    cy.intercept({
      method: 'POST',
      url: '/api/users',
    }).as('apiCheck') 
    cy.wait('@apiCheck').then((interception) => {
      assert.isNotNull(null || interception.response.body, '1st API call has data')
    })
    cy.intercept({
      method: 'GET',
      url: '/api/users?page=1',
    }).as('apiCheck2') 
    cy.wait('@apiCheck2').then((interception) => {
      assert.isNotNull(interception.response.body, '2st API call has data')
    })
  });
});
// import users from './../fixtures/users/reporter.json'
// it('loads the same object', () => {
//   cy.fixture('users').then((userFixture) => {
//     expect(users, 'the same data').to.deep.equal(userFixture)
//   })
// })

// ** The following code is an example to show you how to write some tests for your home page **
//
// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('has pretty background', () => {
//     cy.dataCy('landing-wrapper')
//       .should('have.css', 'background')
//       .and('match', /(".+(\/img\/background).+\.png)/);
//   });
//   it('has pretty logo', () => {
//     cy.dataCy('landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/);
//   });
//   it('has very important information', () => {
//     cy.dataCy('instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD');
//   });
// });
