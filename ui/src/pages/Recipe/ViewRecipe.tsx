import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import IRecipe from "../../interfaces/IRecipe";
import Recipe from "../../components/Recipe/Recipe";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../baseurl";

export type RecipeParams = {
  id: string;
};

const ViewRecipe = () => {
  const { id } = useParams() as { id: string };
  const { data: recipe, error } = useFetch<IRecipe>(
    `${BASE_URL}/recipes/${id}`
  );

  if (error) return <p>There is an error.</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <>
      <Header hasReturn={true} title={`Showing Recipe '${recipe.name}'`} />
      <Recipe recipe={recipe} showExpanded={true} />
    </>
  );
};

export default ViewRecipe;
