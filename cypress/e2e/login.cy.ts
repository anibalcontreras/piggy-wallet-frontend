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

  // Interceptar las peticiones de la API (puedes personalizar esto según tu API)
  // cy.intercept('POST', '/api/auth/login', { statusCode: 200 }).as('postLogin');

  it('should log in a user', () => {
    cy.get('@email').type('gabriel.quiroz@uc.cl');
    cy.get('@password').type('Piggywallet2024');
    cy.get('@submit').should('not.have.attr', 'aria-disabled', 'true');
    cy.get('@submit').click();

    // Esperar que la petición de login se haya completado
    // cy.wait('@postLogin');

    // Verificar redireccionamiento o mensaje de éxito
    // cy.url().should('include', '/home');
    // cy.contains('Bienvenido').should('be.visible');
  });

  it('should fail to submit form with invalid fields', () => {
    cy.get('@email').type('invalidEmail');
    cy.get('@password').type('short');
    cy.get('@submit').should('have.attr', 'aria-disabled', 'true');
  });
});
