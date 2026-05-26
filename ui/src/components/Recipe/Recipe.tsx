import { useHistory } from "react-router-dom";
import IRecipe from "../../interfaces/IRecipe";
import Button from "../Button/Button";
import "./Recipe.css";

type Props = {
  recipe: IRecipe;
  showExpanded?: boolean;
};

const Recipe = (props: Props) => {
  const location = useHistory();

  const { recipe, showExpanded = false } = props;

  const handleShowRecipe = () => {
    location.push(`/recipe/${recipe._id}`);
  };

  const showIngredientsAsSpan = () => {
    return recipe.ingredients.map((i, index) => (
      <span key={index}>
        {i.ingredient} ({i.quantity}
        {i.measure === "x" || i.measure === "" ? "" : " " + i.measure})
        {index === recipe.ingredients.length ? "" : ", "}
      </span>
    ));
  };
  // to do: implement in api - a way that updates or renames an ingredient and updates this list
  //  or replace it with a backend-driven flag (e.g. isIngredientChanged) on the ingredient entity.
  const showIngredientsAsList = () => {
    return (
      <ul>
        {recipe.ingredients.map((i, index) => {
          return (
            <li key={i.ingredient}>
              <div className="ingredient-measurement">{`${i.quantity}${
                i.measure === "x" || i.measure === "" ? "" : " "
              }${i.measure}`}</div>
              <span> {i.ingredient}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="recipe-container">
      <h2>{recipe.name}</h2>
      <span className="recipe-serves">{`Serves ${recipe.servings}`}</span>
      <h3>Ingredients</h3>
      <div className="recipe-ingredients">
        {showExpanded && showIngredientsAsList()}
        {!showExpanded && showIngredientsAsSpan()}
      </div>
      {showExpanded && (
        <>
          <h3>Method</h3>
          <div className="recipe-cooking-method">
            <ul>
              {recipe.cookingMethod.map((cm, index) => {
                return <li key={index}>{cm.method} </li>;
              })}
            </ul>
          </div>
        </>
      )}
      {!showExpanded && (
        <div className="show-recipe-btn-container">
          <Button
            type={"alt"}
            onClick={() => handleShowRecipe()}
            text={"Show Recipe"}
          />
        </div>
      )}
    </div>
  );
};

export default Recipe;
