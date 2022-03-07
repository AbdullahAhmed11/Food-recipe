import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar.jsx";
import RecipeCart from "./Components/RecipeCard.jsx";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoadig] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  //search for the recipes
  const searchRecipes = async () => {
    setIsLoadig(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setRecipes(data.meals);
    setIsLoadig(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };
  return (
    <div className="container">
      <h2>Our Food Recipe</h2>
      <SearchBar
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <div className="recipes">
        {recipes
          ? recipes.map((recipe) => (
              <RecipeCart key={recipe.idMeal} recipe={recipe} />
            ))
          : "No Result"}
      </div>
    </div>
  );
}

export default App;
