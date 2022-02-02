import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import AddRecipe from "./pages/Recipe/AddRecipe";
import ViewRecipe from "./pages/Recipe/ViewRecipe";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/recipe/add" component={AddRecipe} />
          <Route path="/recipe/:id" component={ViewRecipe} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
