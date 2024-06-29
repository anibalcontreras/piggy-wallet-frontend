describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="fullName"]').as('fullName');
      cy.get('[data-testid="phoneNumber"]').as('phoneNumber');
      cy.get('[data-testid="email"]').as('email');
      cy.get('[data-testid="password"]').as('password');
      cy.get('[data-testid="confirmPassword"]').as('confirmPassword');
      cy.get('[data-testid="submit"]').as('submit');
    });
  });

  // Interceptar las peticiones de la API (puedes personalizar esto según tu API)
  // cy.intercept('POST', '/api/auth/register', { statusCode: 201 }).as('postRegister');

  it('should sign up a user', () => {
    cy.get('@fullName').type('Gabriel Quiroz');
    cy.get('@phoneNumber').type('+56912345678');
    cy.get('@email').type('gabriel.quiroz@uc.cl');
    cy.get('@password').type('Piggywallet2024');
    cy.get('@confirmPassword').type('Piggywallet2024');
    cy.get('@submit').should('not.have.attr', 'aria-disabled', 'true');
    cy.get('@submit').click();

    // Esperar que la petición de registro se haya completado
    // cy.wait('@postRegister');

    // Verificar redireccionamiento o mensaje de éxito
    // cy.url().should('include', '/login');
    // cy.contains('¡Cuenta creada con éxito!').should('be.visible');
  });

  it('should fail to submit form with invalid fields', () => {
    cy.get('@fullName').type('invalidName');
    cy.get('@phoneNumber').type('invalidPhone');
    cy.get('@email').type('invalidEmail');
    cy.get('@password').type('weakPassword');
    cy.get('@confirmPassword').type('mismatchedpassword');
    cy.get('@submit').should('have.attr', 'aria-disabled', 'true');
  });
});
