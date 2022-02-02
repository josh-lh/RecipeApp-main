import IRecipe from "../../interfaces/IRecipe";
import { useForm, useFieldArray } from "react-hook-form";
import { saveRecipe } from "../../services/recipes.service";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./RecipeForm.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const RecipeForm = () => {
  const navigator = useHistory();
  const [minIngredients, setMinIngredients] = useState(true);
  const [minCookingSteps, setMinCookingSteps] = useState(true);

  // used react-hook-form for form building but next time I would just build it myself - didn't really help that much.
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecipe>();

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: methodFields,
    append: methodAppend,
    remove: methodRemove,
  } = useFieldArray({
    control,
    name: "cookingMethod",
  });

  const onSubmit = async (data: any) => {
    setMinIngredients(data.ingredients.length > 0);
    setMinCookingSteps(data.cookingMethod.length > 0);
    if (!minIngredients || !minCookingSteps) return;

    await saveRecipe(data)
      .then((response) => {
        return response.ok ? response.text() : null;
      })
      .then((data) => {
        if (data) navigator.push(`/recipe/${JSON.parse(data)}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Recipe</h3>
      <div className="form-item-container">
        <Input
          type="text"
          placeholder="Recipe name"
          flexGrow={2}
          additionalProps={{
            ...register("name", { required: "recipe name is required" }),
          }}
        />
        <Input
          type="number"
          placeholder="serves"
          additionalProps={{
            ...register("servings", {
              required: "servings is required",
              min: 1,
            }),
          }}
        />
      </div>
      <div className="form-validation-error">
        {errors.name && <p>{errors.name.message}</p>}
        {errors.servings && <p>{errors.servings.message}</p>}
      </div>
      <h3>Ingredients</h3>
      {ingredientsFields.map((field, index) => {
        return (
          <>
            <div className="form-item-container" key={field.id}>
              <Input
                type="number"
                placeholder="quantity"
                width="100px"
                additionalProps={{
                  ...register(`ingredients.${index}.quantity` as const, {
                    required: "ingredient quantity is required",
                    min: 1,
                  }),
                }}
              />
              <Input
                type="text"
                placeholder="x"
                width="50px"
                additionalProps={{
                  ...register(`ingredients.${index}.measure` as const),
                }}
              />
              <Input
                type="text"
                placeholder="ingredient"
                flexGrow={2}
                additionalProps={{
                  ...register(`ingredients.${index}.ingredient` as const, {
                    required: "ingredient name is required",
                    minLength: 3,
                  }),
                }}
              />
              <Button
                type="alt"
                onClick={() => ingredientsRemove(index)}
                text="Delete"
              />
            </div>
            <div className="form-validation-error" key={`error${field.id}`}>
              {errors.ingredients?.[index]?.quantity && (
                <p>{errors.ingredients[index].quantity?.message}</p>
              )}
              {errors.ingredients?.[index]?.ingredient && (
                <p>{errors.ingredients[index].ingredient?.message}</p>
              )}
            </div>
          </>
        );
      })}
      <div className="form-validation-error">
        {!minIngredients && <p>At least one ingredient is required.</p>}
      </div>
      <Button
        type="alt"
        text="Add Ingredient"
        onClick={() => {
          setMinIngredients(true);
          ingredientsAppend({
            quantity: 1,
            measure: "",
            ingredient: "",
          });
        }}
      />

      <h3>Method</h3>
      {methodFields.map((field, index) => {
        return (
          <>
            <div className="form-item-container" key={field.id}>
              <div className="step">{index + 1}.</div>
              <Input
                type="text"
                placeholder="method"
                flexGrow={2}
                additionalProps={{
                  ...register(`cookingMethod.${index}.method` as const, {
                    required: "cooking step cannot be empty",
                    minLength: 3,
                    maxLength: 250,
                  }),
                }}
              />
              <Button
                text="Delete"
                type="alt"
                onClick={() => methodRemove(index)}
              />
            </div>
            <div className="form-validation-error" key={`error${field.id}`}>
              {errors.cookingMethod?.[index]?.method && (
                <p>{errors.cookingMethod[index].method?.message}</p>
              )}
            </div>
          </>
        );
      })}
      <div className="form-validation-error">
        {!minCookingSteps && <p>At least one step is required.</p>}
      </div>
      <Button
        text="Add Step"
        type="alt"
        onClick={() => {
          setMinCookingSteps(true);
          methodAppend({
            method: "",
          });
        }}
      />
      <div className="submit-form-input">
        <input type="submit" />
      </div>
    </form>
  );
};

export default RecipeForm;
