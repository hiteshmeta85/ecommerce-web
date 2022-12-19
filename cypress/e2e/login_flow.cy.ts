describe('Login flow test', () => {
  it('login existing user', () => {
    cy.visit(`http://${Cypress.env("UI_HOST")}/auth/login`);
    cy.contains("div", "Login");
    cy.get("input[name=email]").type(`${Cypress.env("SESSION_EMAIL")}`);
    cy.get("input[name=password]").type(`${Cypress.env("SESSION_PASSWORD")}`);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "/");
    cy.contains("div", "Homepage");
  })
})

export {}
