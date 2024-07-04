describe('Debt Screen', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: '/auth/login/',
      },
      [
        {
          access_token:
            'eyJraWQiOiI3a3QydVgzb2pQZ0EwSXlvTmRBVGw4MnBic2x4ZllzckFxeW9Nd3NDTDkwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MTNiMjViMC1mMGUxLTcwNDgtZmE1ZS04Y2IzMmM1NzBmNmQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl83cXA5ZWlhRUwiLCJjbGllbnRfaWQiOiI0OTRhOXVnY3Nlb2I4ZDk2bXJvbjQ1c3U5aSIsIm9yaWdpbl9qdGkiOiJkZDQ3YmE2YS01OTQxLTQ5MjctOWVlZC1iNzM2N2RhNDUxNGEiLCJldmVudF9pZCI6IjE3NWY0ZjYyLTdjOWQtNGI5Zi04MGI5LTQ0MDhlOTA2OGIyMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MTc0MjgxMjAsImV4cCI6MTcxNzQzMTcyMCwiaWF0IjoxNzE3NDI4MTIwLCJqdGkiOiIxNmQ4ZDAxZC0zNzE5LTQ1YTMtYmQ0OS04NWQ5NjQ5YzkyODUiLCJ1c2VybmFtZSI6IjUxM2IyNWIwLWYwZTEtNzA0OC1mYTVlLThjYjMyYzU3MGY2ZCJ9.m64lgxn_QVW7GTj8CIC2qGBWSBCMQBnuDgM2Hajv8ECn0FN9fPL3YEy6y0JIGSF1uZ678NA5z11iM1Dcgo-CGun2Zl0Y-kr8MF5iMYCgx_Quua8fwHNwkLuqyAe-99YD0FCAZoJpPE-sAtrrErl7v4viGng9OMjCXyazab5m7WG74IP0IhXvcvQbh39LUR58jaU2yW65IMv-iG707k8Sp-TdnAbq7b8L9ZJ_SH6WhhsUrE50BiLgXfnPjngKNTFCJwqMaJa4djMimk1L22VxnfU1_po3nSK2meO8zFrMxT-eKzrbjTP_XYVM3-NWnOQm47TAvNBDBnziYy9EXyT0WA',
          id_token:
            'eyJraWQiOiJ6OXFvUXdJdjRYdG43UUJ5VHpqSEx5dnNUZkI5d0p0SHl3VTlaMDBkZk9BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MTNiMjViMC1mMGUxLTcwNDgtZmE1ZS04Y2IzMmM1NzBmNmQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdxcDllaWFFTCIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiI1MTNiMjViMC1mMGUxLTcwNDgtZmE1ZS04Y2IzMmM1NzBmNmQiLCJvcmlnaW5fanRpIjoiZGQ0N2JhNmEtNTk0MS00OTI3LTllZWQtYjczNjdkYTQ1MTRhIiwiYXVkIjoiNDk0YTl1Z2NzZW9iOGQ5Nm1yb240NXN1OWkiLCJldmVudF9pZCI6IjE3NWY0ZjYyLTdjOWQtNGI5Zi04MGI5LTQ0MDhlOTA2OGIyMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzE3NDI4MTIwLCJuYW1lIjoiVGVzdCBVc2VyIiwicGhvbmVfbnVtYmVyIjoiKzU2OTU0MzIxMjM0IiwiZXhwIjoxNzE3NDMxNzIwLCJpYXQiOjE3MTc0MjgxMjAsImp0aSI6ImEwY2U5ZjlmLTg5YzctNGQ3Yi1hNzliLTJjZDI1MjhjZTMzYyIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifQ.1ufOuz-sk17dbbY_spUo3_VgbQwJWZEiGqX2-WAHP6Hf9f7Tv707-BpRdKwM1zxKCYGwHRVQGkY8lmb6NpPVnojEDBavqCX0Q57Qq48Yhnmdqcg8CpP3NiZYkxxj0bzxipBhF7R9wXI_Aq_uMugacR-iVnj9Xt9lsyDp-KWtNGj2Yfd8aoblPPiboKXnHPv7296mWBdWeJ0u9T6pllRVhL3gBD115U-0WiulEKgc8pX-NvtPVS1MrnD4PpGI-7Sx2CMI0NdEUkDFH79CkfBRhujEjJNf52BFe5CA5LDE7EN_jTYwoHk7p0b9SmIO6AjzY-2pkVJA5xtR044y10gGnw',
        },
      ]
    ).as('postLogin');
    cy.intercept(
      {
        method: 'GET',
        url: '/expenses/grouped/',
      },
      {
        fixture: 'expenses-grouped.json',
      }
    ).as('getExpenses');
    cy.intercept(
      {
        method: 'GET',
        url: '/user_expense_type/',
      },
      {
        fixture: 'user_expense_type.json',
      }
    ).as('getUserExpenseType');
    cy.intercept(
      {
        method: 'GET',
        url: '/budget/',
      },
      {
        fixture: 'budget.json',
      }
    ).as('getBudget');
    cy.intercept(
      {
        method: 'GET',
        url: '/debt/users/',
      },
      {
        fixture: 'debt-users.json',
      }
    ).as('getDebtUsers');
    cy.intercept(
      {
        method: 'GET',
        url: '/auth/profile/',
      },
      {
        fixture: 'profile.json',
      }
    ).as('getProfile');
    cy.intercept(
      {
        method: 'GET',
        url: '/piggies/',
      },
      {
        fixture: 'piggies.json',
      }
    ).as('getPiggies');

    cy.visit('/');
    cy.get('[data-testid="landing-screen"]').within(() => {
      cy.get('[data-testid="login-button"]').click();
    });
    cy.get('[data-testid="login-screen"]').within(() => {
      cy.get('[data-testid="email"]').as('email');
      cy.get('[data-testid="password"]').as('password');
      cy.get('[data-testid="submit"]').as('submit');
    });
    cy.get('@email').type('gabriel.quiroz@uc.cl');
    cy.get('@password').type('Piggywallet2024');
    cy.get('@submit').should('not.have.attr', 'aria-disabled', 'true');
    cy.get('@submit').click();
    cy.wait('@postLogin');
    cy.wait('@getExpenses');
    cy.wait('@getUserExpenseType');
    cy.wait('@getBudget');

    cy.get('[data-testid="Gastos-tab"]').as('expensesTab');
    cy.get('[data-testid="Deudas-tab"]').as('debtTab');
    cy.get('[data-testid="Perfil-tab"]').as('profileTab');
  });

  it('should navigate between the tabs after login', () => {
    cy.get('[data-testid="home-screen"]').within(() => {
      cy.get('[data-testid="month-expenses-text"]').should('contain', 'Gastos del mes');
      cy.get('[data-testid="month-budget-text"]').should('contain', 'Presupuesto mensual');
    });
    cy.get('@expensesTab').click();
    // Aca se debe ibcluir el test para la pantalla de gastos cuando Vergara haga su feature
    cy.get('@debtTab').click();
    cy.get('[data-testid="debts-screen"]').within(() => {
      cy.get('[data-testid="debts-text"]').should(
        'contain',
        'Tienes deudas con las siguientes personas'
      );
    });
    cy.get('@profileTab').click();
    cy.get('[data-testid="profile-screen"]').within(() => {
      cy.get('[data-testid="profile-text"]').should('contain', 'Tus Piggies');
    });
  });
});
