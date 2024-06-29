describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="email"]').as('email');
      cy.get('[data-testid="password"]').as('password');
      cy.get('[data-testid="submit"]').as('submit');
    });
  });

  it('should log in a user', () => {
    cy.intercept({
      method: 'POST',
      url: '/auth/login/',
    }).as('postLogin');
    cy.get('@email').type('gabriel.quiroz@uc.cl');
    cy.get('@password').type('Piggywallet2024');
    cy.get('@submit').should('not.have.attr', 'aria-disabled', 'true');
    cy.get('@submit').click();

    cy.wait('@postLogin');
  });

  it('should fail to submit form with invalid fields', () => {
    cy.get('@email').type('invalidEmail');
    cy.get('@password').type('short');
    cy.get('@submit').should('have.attr', 'aria-disabled', 'true');
  });
});
