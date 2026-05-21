import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IRecipe from "../../interfaces/IRecipe";
import Recipe from "../../components/Recipe/Recipe";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../baseurl";

const ViewRecipe = () => {
  const { id } = useParams() as { id: string };
  const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p>There is an error.</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <>
      <Header hasReturn={true} title={`Showing Recipe '${recipe.name}'`} />
      <Recipe recipe={recipe} showExpanded={true} />
      {/* TODO: add Edit button - this view is currently read-only */}
    </>
  );
};

export default ViewRecipe;
