import { IIngredient } from "./IIngredient";
import { ICookingStep } from "./ICookingStep";

export default interface IRecipe {
  _id?: string;
  name: string;
  servings: number;
  ingredients: IIngredient[];
  cookingMethod: Array<ICookingStep>;
}
