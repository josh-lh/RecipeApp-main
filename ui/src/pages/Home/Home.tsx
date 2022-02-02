import "./home.css";
import Header from "../../components/Header/Header";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Home = () => {
  const navigator = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const headerButton = {
    text: "Add Recipe",
    onClick: () => navigator.push("/recipe/add"),
  };

  return (
    <div className="home-container">
      <Header
        title="All Recipes"
        hasReturn={false}
        button={headerButton}
        headerStyle="space-between"
      />
      <div className="inner-container">
        <input
          className="home-search-recipes"
          type="text"
          onChange={handleSearchChange}
          placeholder="search recipes..."
          value={searchValue}
        />
        <RecipeList searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Home;
