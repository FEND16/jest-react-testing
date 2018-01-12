describe('App.js', () => {
  it('should check if currency is EUR', ()=> {
    cy.visit('http://localhost:3000');
    cy.get('[data-test="button"]').click();
    cy.get('[data-test="button"]').should('have.class', 'opacity-50')
  });
})