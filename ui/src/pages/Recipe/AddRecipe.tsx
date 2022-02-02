import Header from "../../components/Header/Header";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

type Props = {};

const AddRecipe = (props: Props) => {
  return (
    <>
      <Header title="Add New Recipe" hasReturn={true} />
      <RecipeForm />
    </>
  );
};

export default AddRecipe;
