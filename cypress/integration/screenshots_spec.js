describe.skip('Screenshots', () => {
  context('Screenshots', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('viewport screenshots', () => {
      cy.viewport('macbook-15');
      cy.screenshot('macbook-15');
      cy.wait(200);
      cy.viewport('ipad-mini');
      cy.screenshot('ipad-mini');
      cy.wait(200);
      cy.viewport('iphone-6+');
      cy.screenshot('iphone-6+');
    });
  });
});
