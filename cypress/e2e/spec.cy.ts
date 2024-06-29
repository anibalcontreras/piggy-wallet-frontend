describe('Auth Flow', () => {
  it('should navigate from landing to login and back to landing, then to register and back to landing', () => {
    cy.visit('http://localhost:8081/');

    // From landing to login
    // cy.get('[data-cy="login-button"]').click();
    cy.contains('Iniciar Sesión').click();
    // cy.get('[data-cy="login-text"]').should('contain.text', 'Ingresa para organizar tus finanzas');
    cy.get("div[id='root']").should('have.text', 'Ingresa para organizar tus finanzas');

    // // From login to signup
    // cy.get('[signup-button]').click();
    // cy.get('[data-cy="signup-text"]').should(
    //   'contain.text',
    //   'Registrate para organizar tus finanzas'
    // );

    // // From signup to login
    // cy.get('[data-cy="login-button"]').click();
    // cy.get('[data-cy="login-text"]').should('contain.text', 'Ingresa para organizar tus finanzas');

    // // From login to landing
    // cy.get('[data-cy="home-logo"]').click();
    // cy.get('[data-cy="landing-text"]').should('contain.text', 'Gestiona tus finanzas sabiamente');

    // // From landing to register
    // cy.get('[data-cy="signup-button"]').click();
    // cy.get('[data-cy="signup-text"]').should(
    //   'contain.text',
    //   'Registrate para organizar tus finanzas'
    // );

    // // From register to landing
    // cy.get('[data-cy="home-logo"]').click();
    // cy.get('[data-cy="landing-text"]').should('contain.text', 'Gestiona tus finanzas sabiamente');
  });
});
