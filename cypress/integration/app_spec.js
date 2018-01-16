describe('App.js', () => {

  context('Rates', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get(`[data-test="list"]`).as('list');
    });

    it('rate should be EUR', () => {
      cy.get('h1').first().should('contain', 'EUR');
    });

    it('first rate should be AUD', () => {
      cy.get(`[data-test="list"] p`).first().should('contain', 'AUD');
    });

    it('first rate should be ZAR', () => {
      cy.get(`[data-test="list"] p`).last().should('contain', 'ZAR');
    });

    it('should get all rates', () => {
      cy.get(`[data-test="list"]`).children().should('have.length', 31);
    });
  });

  context('Search bar', () => {

    beforeEach(()=> {
      cy.visit('http://localhost:3000');
      cy.get(`[data-test="input"]`).as('input');
      cy.get(`[data-test="list"]`).as('list');
    });

    it('should filter results', () => {
      cy.get(`@input`)
      cy.get(`@input`).type(`AUD`)
      cy.get(`@list`).children().should('have.length', 1).and('contain', 'AUD');
    });

    it('should filter and show multiple results', () => {
      cy.get(`@input`)
      cy.get(`@input`).type(`B`)
      cy.get(`@list`).children().should('have.length', 5);
    });
  });

  context('Button', () => {

    beforeEach(()=> {
      cy.visit('http://localhost:3000')
      cy.get(`[data-test="button"]`).as('button')
    });

    it('should be enabled at page load', () => {
      cy.get(`@button`).should('not.have.class', 'opacity-50');
    });

    it('should disable button', () => { 
      cy.get(`@button`).click();
      cy.get(`@button`).should('have.class', 'opacity-50');
    });

    it('should be enabled button', () => { 
      cy.get(`@button`).click();
      cy.get(`@button`).should('have.class', 'opacity-50');
    });

    it.skip('should wait for button to be enabled', () => { 
      cy.get(`@button`).click();
      cy.get(`@button`).should('have.class', 'opacity-50');
      cy.wait(30000);
      cy.get(`@button`).should('not.have.class', 'opacity-50');
    });
  });
});