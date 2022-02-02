import useFetch from "../../hooks/useFetch";
import IRecipe from "../../interfaces/IRecipe";
import Recipe from "../Recipe/Recipe";
import "./RecipeList.css";
import { BASE_URL } from "../../../src/baseurl";

type Props = {
  searchValue: string;
};

// make shift filtered data as I had some issues working with $text/$search when
// querying mongo via api (first time using mongo) - usually I would make use of
// query params and let api handle (also for pagination)
const getFilteredData = (searchValue: string, data: IRecipe[]) => {
  if (searchValue === "") return data as IRecipe[];

  let searchValueToLower = searchValue.toLowerCase();
  const filteredData = data.filter((r) => {
    return (
      r.name.toLowerCase().includes(searchValueToLower) ||
      r.ingredients.find((i) =>
        i.ingredient.toLowerCase().includes(searchValueToLower)
      )
    );
  });

  return filteredData as IRecipe[];
};

const RecipeList = (props: Props) => {
  const { searchValue } = props;
  const { data, error } = useFetch<IRecipe[]>(BASE_URL + "/recipes");

  if (error) return <p>There is an error.</p>;
  if (data && data.length === 0) return <p>No recipes exist, add one.</p>;
  if (!data) return <p>Loading...</p>;

  const filteredData = getFilteredData(searchValue.toLowerCase(), data);

  return (
    <div className="recipe-list">
      {filteredData.length > 0 ? (
        filteredData.map((r) => {
          return <Recipe recipe={r} key={r._id} />;
        })
      ) : (
        <p>No recipes found for '{searchValue}'</p>
      )}
    </div>
  );
};

export default RecipeList;
