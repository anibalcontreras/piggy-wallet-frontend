describe('Auth Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate from Landing to Login and back', () => {
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
      cy.get('[data-testid="landing-button"]').click();
    });
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
    });
  });

  it('should navigate from Landing to Signup and back', () => {
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="signup-text"]').should(
        'contain',
        'Registrate para organizar tus finanzas'
      );
      cy.get('[data-testid="landing-button"]').click();
    });
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
    });
  });

  it('should navigate from Landing to Login to Signup', () => {
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="signup-text"]').should(
        'contain',
        'Registrate para organizar tus finanzas'
      );
    });
  });

  it('should navigate from Signup to Login', () => {
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="signup-text"]').should(
        'contain',
        'Registrate para organizar tus finanzas'
      );
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
    });
  });

  it('should navigate through all screens', () => {
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
      cy.get('[data-testid="landing-button"]').click();
    });
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="signup-text"]').should(
        'contain',
        'Registrate para organizar tus finanzas'
      );
      cy.get('[data-testid="landing-button"]').click();
    });
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="landing-text"]').should('contain', 'Gestiona tus finanzas sabiamente');
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
      cy.get('[data-testid="signup-button"]').click();
    });
    cy.get('[data-testid="signup-screen"]').within(() => {
      cy.get('[data-testid="signup-text"]').should(
        'contain',
        'Registrate para organizar tus finanzas'
      );
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="login-text"]').should('contain', 'Ingresa para organizar tus finanzas');
    });
  });
});
