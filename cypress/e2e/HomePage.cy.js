describe('HomePage', () => {
  it('should have logo', () => {
    cy.visit('/');
    cy.get('.logo-letters');
  });
});
