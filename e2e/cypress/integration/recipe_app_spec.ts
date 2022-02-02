describe("Recipe tests", () => {
  // to do: clear up test recipe/mock the call - ran out of time to implement sorry.
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
    // add test recipe
    cy.visit("http://localhost:3000");
    cy.get(".header-container > .button").click();
    cy.get(`[type="text"]`).clear();
    cy.get(`[type="text"]`).type("Test Recipe");
    cy.get(`[type="number"]`).type("4");
    cy.get("form > :nth-child(6)").click();
    cy.get(`:nth-child(5) > [type="number"]`).clear();
    cy.get(`:nth-child(5) > [type="number"]`).type("100");
    cy.get(`[placeholder="x"]`).type("g");
    cy.get(`[placeholder="ingredient"]`).type("butter");
    cy.get("form > :nth-child(8)").click();
    cy.get(`:nth-child(7) > [type="number"]`).clear();
    cy.get(`:nth-child(7) > [type="number"]`).type("70");
    cy.get(`:nth-child(7) > [placeholder="x"]`).type("g");
    cy.get(`:nth-child(7) > [placeholder="ingredient"]`).type("sugar");
    cy.get("form > :nth-child(10)").click();
    cy.get(`:nth-child(9) > [type="number"]`).clear();
    cy.get(`:nth-child(9) > [type="number"]`).type("120");
    cy.get(`:nth-child(9) > [placeholder="x"]`).type("g");
    cy.get(`:nth-child(9) > [placeholder="ingredient"]`).type("flour");
    cy.get("form > :nth-child(15)").click();
    cy.get(":nth-child(14) > .custom-input").type(
      `Preheat oven to 180°C (160ºC fan).`
    );
    cy.get("form > :nth-child(17)").click();
    cy.get(":nth-child(16) > .custom-input").type(
      `Mix the sugar and butter to cream the stir the flour`
    );
    cy.get("form > :nth-child(19)").click();
    cy.get(":nth-child(18) > .custom-input").type(
      `Form the cookies into 2.5-cm balls, placing them on a baking tray.`
    );
    cy.get("form > :nth-child(21)").click();
    cy.get(":nth-child(20) > .custom-input").type(`Bake for 15 minutes.`);
    cy.get(".submit-form-input > input").click();

    // after test reciped added checks
    cy.location().should((loc) => {
      expect(loc.pathname).to.not.eq("/recipe/add");
      expect(loc.pathname).to.include("/recipe/");
    });
    cy.get("h1").should("have.text", "Showing Recipe 'Test Recipe'");
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    cy.visit("http://localhost:3000");
    cy.get(".home-search-recipes").type("Test Recipe");
    cy.get(":nth-child(1) > .show-recipe-btn-container > .button").click();

    cy.get("h2").should("have.text", "Test Recipe");
    cy.get(":nth-child(1) > .ingredient-measurement").should(
      "have.text",
      "100 g"
    );
    cy.get(":nth-child(1) > span").should("have.text", " butter");
    cy.get(":nth-child(2) > .ingredient-measurement").should(
      "have.text",
      "70 g"
    );
    cy.get("ul > :nth-child(2) > span").should("have.text", " sugar");
    cy.get(":nth-child(3) > .ingredient-measurement").should(
      "have.text",
      "120 g"
    );
    cy.get(":nth-child(3) > span").should("have.text", " flour");
    cy.get(".recipe-cooking-method").should("be.visible");
  });

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    cy.visit("http://localhost:3000");
    cy.get(".home-search-recipes").type("flour");
    cy.get(":nth-child(1) > .show-recipe-btn-container > .button").click();

    cy.get("h2").should("have.text", "Test Recipe");
    cy.get(":nth-child(1) > .ingredient-measurement").should(
      "have.text",
      "100 g"
    );
    cy.get(":nth-child(1) > span").should("have.text", " butter");
    cy.get(":nth-child(2) > .ingredient-measurement").should(
      "have.text",
      "70 g"
    );
    cy.get("ul > :nth-child(2) > span").should("have.text", " sugar");
    cy.get(":nth-child(3) > .ingredient-measurement").should(
      "have.text",
      "120 g"
    );
    cy.get(":nth-child(3) > span").should("have.text", " flour");
    cy.get(".recipe-cooking-method").should("be.visible");
  });
});
