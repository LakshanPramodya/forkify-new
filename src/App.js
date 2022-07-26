import React, { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import SearchResults from "./components/SearchResults/SearchResults";
import Recipe from "./components/Recipe/Recipe";
import AddRecipe from "./components/AddRecipe/AddRecipe";

const App = function () {
  const [recipe, setRecipe] = useState([]);
  const [recipes, setRecipes] = useState();
  const [recipesPage, setRecipesPage] = useState();
  const [page, setPage] = useState();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isAddRecipeHidden, setIsAddRecipeHidden] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const API_KEY = "2a8905e2-39cf-4b2c-8fff-4b8b0855a991";
  const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
  const RES_PER_PAGE = 10;
  const RES_ERR_MSG = `No response! Please try again later 😉`;

  useEffect(() => {
    const storage = localStorage.getItem("bookmarks");
    if (storage) setBookmarks(JSON.parse(storage));
  }, []);

  const getRecipe = async function (id) {
    try {
      setIsLoadingRecipe(true);
      const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
      if (!response.ok) throw new Error(RES_ERR_MSG);
      const data = await response.json();
      const { recipe } = data.data;

      if (bookmarks.some((bookmark) => bookmark.id === id)) {
        recipe.bookmarked = true;
      } else {
        recipe.bookmarked = false;
      }
      setRecipe(recipe);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const getResults = async function (searchItem) {
    try {
      setRecipesPage([]);
      setIsLoadingResults(true);
      const response = await fetch(
        `${API_URL}?search=${searchItem}&key=${API_KEY}`
      );
      if (!response.ok) throw new Error(RES_ERR_MSG);
      const data = await response.json();
      const { recipes } = data.data;
      setRecipes(recipes);
      setRecipesPage(recipes.slice(0, RES_PER_PAGE));
      setPage(1);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  const uploadRecipe = async function (newRecipe) {
    try {
      setIsLoadingUpload(true);
      const response = await fetch(`${API_URL}/?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) throw new Error(RES_ERR_MSG);
      const data = await response.json();
      const { recipe } = data.data;
      addBookmark(recipe);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const getRecipesPage = function (page) {
    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;
    setRecipesPage(recipes && recipes.slice(start, end));
  };

  const storeBookmarks = function (newBookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const addBookmark = function (recipe) {
    setRecipe({ ...recipe, bookmarked: true });
    const newBookmarks = [...bookmarks, { ...recipe, bookmarked: true }];
    setBookmarks(newBookmarks);
    storeBookmarks(newBookmarks);
  };

  const deleteBookmark = function () {
    setRecipe({ ...recipe, bookmarked: false });
    const newBookmarks = [...bookmarks].filter(
      (bookmark) => bookmark.id !== recipe.id
    );
    setBookmarks(newBookmarks);
    storeBookmarks(newBookmarks);
  };

  return (
    <div className="container">
      <Header
        getResults={getResults}
        bookmarks={bookmarks}
        getRecipe={getRecipe}
        setIsAddRecipeHidden={setIsAddRecipeHidden}
        setIsSubmit={setIsSubmit}
      />
      <SearchResults
        recipes={recipes}
        recipesPage={recipesPage}
        getRecipe={getRecipe}
        getRecipesPage={getRecipesPage}
        page={page}
        setPage={setPage}
        isLoadingResults={isLoadingResults}
      />
      <Recipe
        key={recipe.id}
        recipe={recipe}
        addBookmark={addBookmark}
        deleteBookmark={deleteBookmark}
        isLoadingRecipe={isLoadingRecipe}
      />

      <AddRecipe
        isAddRecipeHidden={isAddRecipeHidden}
        setIsAddRecipeHidden={setIsAddRecipeHidden}
        uploadRecipe={uploadRecipe}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        isLoadingUpload={isLoadingUpload}
      />
    </div>
  );
};

export default App;
