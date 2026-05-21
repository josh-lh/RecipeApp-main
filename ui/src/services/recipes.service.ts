import IRecipe from "../interfaces/IRecipe";
import { BASE_URL } from "../baseurl";

export async function saveRecipe(recipe: IRecipe) {
  return fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
}

// TODO: implement update and delete service methods
// export async function updateRecipe(id: string, recipe: IRecipe) {
//   return fetch(`${BASE_URL}/recipes/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(recipe),
//   });
// }
