import Recipe from "../models/recipe";

/**
 * Due to form returning number values as string, we need to process it so that api
 * can successfully process it (otherwise returns 400)
 */
const processRecipe = (recipe: any) => {
  let processedRecipe = {
    ...recipe,
  };

  if (recipe.servings) processedRecipe.servings = parseInt(recipe.servings);

  if (recipe.ingredients instanceof Array) {
    processedRecipe.ingredients = recipe.ingredients.map(
      (i: { quantity: string }) => {
        return {
          ...i,
          quantity: parseInt(i.quantity),
        };
      }
    );
  }

  if (recipe.cookingMethod instanceof Array) {
    processedRecipe.cookingMethod = recipe.cookingMethod.map(
      (cm: any, index: any) => {
        return {
          ...cm,
          id: index + 1,
        };
      }
    );
  }

  return processedRecipe as Recipe;
};

export default processRecipe;
