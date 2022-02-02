import { ObjectId } from "mongodb";

export interface CookingStep {
  id: number;
  method: string;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
  quantity: number;
  format?: string;
}

export default interface Recipe {
  id?: ObjectId;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  cookingMethod: CookingStep[];
}
