// @ts-nocheck
// TODO: run 'npm install --save-dev jest @types/jest ts-jest' to enable test runner
// Only a smoke test is in place — expand coverage before shipping.

import { recipesRouter } from "../router/recipes.router";

describe("Recipes Router", () => {
  it("router is defined", () => {
    expect(recipesRouter).toBeDefined();
  });

  // TODO: mock MongoDB collections before adding integration tests
  it.todo("GET / returns all recipes as an array");
  it.todo("GET /:id returns 404 when recipe does not exist");
  it.todo("POST / returns 201 and the new recipe id");
  it.todo("DELETE /:id with invalid id — currently crashes (ObjectId not caught)");
});
