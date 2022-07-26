import React from "react";

import ResultsCSS from "./SearchResults.module.css";
import Icons from "../../assets/icons.svg";
import Result from "./Result";
import Pagination from "./Pagination";
import Spinner from "../Spinner/Spinner";

const SearchResults = function (props) {
  const {
    recipesPage,
    getRecipe,
    getRecipesPage,
    recipes,
    page,
    setPage,
    isLoadingResults,
  } = props;
  return (
    <div className={ResultsCSS.search_results}>
      {isLoadingResults && <Spinner />}
      {!isLoadingResults &&
      Array.isArray(recipesPage) &&
      recipesPage.length === 0 ? (
        <div className="error">
          <div>
            <svg>
              <use href={`${Icons}#icon-alert-triangle`}></use>
            </svg>
          </div>
          <p>No recipes found for your query. Please try again!</p>
        </div>
      ) : (
        <div>
          <ul className={ResultsCSS.results}>
            {recipesPage &&
              recipesPage.map((recipe) => {
                return (
                  <Result
                    key={recipe.id}
                    recipe={recipe}
                    getRecipe={getRecipe}
                  />
                );
              })}
          </ul>
        </div>
      )}
      <Pagination
        getRecipesPage={getRecipesPage}
        recipes={recipes}
        page={page}
        setPage={setPage}
      />
      <p className={ResultsCSS.copyright}>
        This application is re-created by{" "}
        <a
          className={ResultsCSS.twitter__link}
          target="_blank"
          href="https://www.linkedin.com/in/lakshan-pramodya/"
        >
          Lakshan Pramoda
        </a>{" "}
        using react. Original work is done by{" "}
        <a
          className={ResultsCSS.twitter__link}
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
      </p>
    </div>
  );
};

export default SearchResults;
