describe('HOMEPAGE', () => {
  beforeEach(() => cy.visit('http://localhost:3000'));

  context('Heading section', () => {
    it('the h1 contains the correct text', () => {
      cy.getByData('hero-heading')
        .contains('Testing Next.js Applications with Cypress')
    });
    it('homepage feats are correct', () => { // target an element containing 3 unnamed elements:
      cy.get('dt').eq(0).contains(/4 courses/i)
        .get('dt').eq(1).contains(/25\+ lessons/i)
        .get('dt').eq(2).contains(/free and open source/i)
    });
  });

  context('Courses section', () => {
    it('Course 1 - testing first Next.js app', () => {
      cy.getByData('course-0')
        .find('a')
        .contains('Get started') //better than eq as test becomes brittle
        .click()
        .location('pathname').should('equal', '/testing-your-first-application')
    });
    it('Course 2 - testing foundations', () => {
      cy.getByData('course-1')
        .find('a')
        .contains('Get started') //better than eq as test becomes brittle
        .click()
        .location('pathname').should('equal', '/testing-foundations')
    });
    it('Course 3 - Cypress fundamentals', () => {
      cy.getByData('course-2')
        .find('a')
        .contains('Get started') //better than eq as test becomes brittle
        .click()
        .location('pathname').should('equal', '/cypress-fundamentals')
    });
  })
}); 


describe('SUBSCRIBE FORM', () => {
  beforeEach(() => cy.visit('http://localhost:3000'));

  it('processes correct email submissions - happy path', () => {
    cy.getByData('email-input')
      .type('adrian@developer.com')
    cy.getByData('submit-button')
      .click()
    cy.getByData('success-message')
      .should('exist')
      .contains('Success')
      .contains('adrian@developer.com')
  });

  it('rejects empty submissions', () => {
    cy.getByData('submit-button')
      .click()
    cy.getByData('success-message')
      .should('not.exist')
    cy.getByData('error-message')
      .should('exist')
      .contains('Email is required')
  });

  it('rejects incompatible submissions', () => {
    cy.getByData('email-input')
      .type('adriandeveloper.com')
    cy.getByData('submit-button')
      .click()
    cy.getByData('success-message')
      .should('not.exist')
  });

  it('rejects emails which have already subscribed', () => {
    cy.getByData('email-input')
      .type('john@example.com')
    cy.getByData('submit-button')
      .click()
    cy.getByData('server-error-message')
      .should('exist')
      .contains('Error: john@example.com already exists')
  });
});