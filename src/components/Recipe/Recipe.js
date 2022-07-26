import React, { useEffect, useState } from "react";

import RecipeCSS from "./Recipe.module.css";
import Icons from "../../assets/icons.svg";
import Ingredient from "./Ingredient";
import Spinner from "../Spinner/Spinner";

const Recipe = function (props) {
  const {
    recipe,
    recipe: {
      title,
      id,
      key,
      image_url,
      cooking_time,
      servings,
      publisher,
      source_url,
      ingredients,
      bookmarked,
    },
    addBookmark,
    deleteBookmark,
    isLoadingRecipe,
  } = props;

  const [newServings, setNewServings] = useState(servings);

  const plusBtnOnClick = function () {
    setNewServings(newServings + 1);
  };

  const minusBtnOnClick = function () {
    setNewServings(newServings - 1);
  };

  const bookmarkBtnOnClick = function () {
    bookmarked ? deleteBookmark() : addBookmark(recipe);
  };

  return (
    <div className="recipe">
      {isLoadingRecipe && <Spinner />}
      {recipe.length === 0
        ? !isLoadingRecipe && (
            <div className="message">
              <div>
                <svg>
                  <use href={`${Icons}#icon-smile`}></use>
                </svg>
              </div>
              <p>Start by searching for a recipe or an ingredient. Have fun!</p>
            </div>
          )
        : !isLoadingRecipe && (
            <div>
              <figure className={RecipeCSS.recipe__fig}>
                <img
                  src={image_url}
                  alt="Tomato"
                  className={RecipeCSS.recipe__img}
                />
                <h1 className={RecipeCSS.recipe__title}>
                  <span>{title}</span>
                </h1>
              </figure>
              <div className={RecipeCSS.recipe__details}>
                <div className={RecipeCSS.recipe__info}>
                  <svg className={RecipeCSS.recipe__info_icon}>
                    <use href={`${Icons}#icon-clock`}></use>
                  </svg>
                  <span className={RecipeCSS.recipe__info_data}>
                    {cooking_time}
                  </span>
                  <span className={RecipeCSS.recipe__info_text}>minutes</span>
                </div>
                <div className={RecipeCSS.recipe__info}>
                  <svg className={RecipeCSS.recipe__info_icon}>
                    <use href={`${Icons}#icon-users`}></use>
                  </svg>
                  <span className={RecipeCSS.recipe__info_data}>
                    {newServings}
                  </span>
                  <span className={RecipeCSS.recipe__info_text}>servings</span>

                  <div className={RecipeCSS.recipe__info_buttons}>
                    <button
                      className={RecipeCSS.btn__tiny}
                      onClick={() => newServings > 1 && minusBtnOnClick()}
                    >
                      <svg>
                        <use href={`${Icons}#icon-minus-circle`}></use>
                      </svg>
                    </button>
                    <button
                      className={RecipeCSS.btn__tiny}
                      onClick={plusBtnOnClick}
                    >
                      <svg>
                        <use href={`${Icons}#icon-plus-circle`}></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  className={[
                    RecipeCSS.recipe__user_generated,
                    key ? "" : RecipeCSS.hidden,
                  ].join(" ")}
                >
                  <svg>
                    <use href={`${Icons}#icon-user`}></use>
                  </svg>
                </div>
                <button
                  className={RecipeCSS.btn__round}
                  onClick={bookmarkBtnOnClick}
                >
                  <svg className="">
                    <use
                      href={`${Icons}#icon-bookmark${
                        bookmarked ? "-fill" : ""
                      }`}
                    ></use>
                  </svg>
                </button>
              </div>
              <div className={RecipeCSS.recipe__ingredients}>
                <h2 className={RecipeCSS.heading__2}>Recipe ingredients</h2>
                <ul className={RecipeCSS.recipe__ingredient_list}>
                  {ingredients &&
                    ingredients.map((ing) => {
                      return (
                        <Ingredient
                          key={ing.description}
                          ing={ing}
                          servings={servings}
                          newServings={newServings}
                        />
                      );
                    })}
                </ul>
              </div>
              <div className={RecipeCSS.recipe__directions}>
                <h2 className={RecipeCSS.heading__2}>How to cook it</h2>
                <p className={RecipeCSS.recipe__directions_text}>
                  This recipe was carefully designed and tested by{" "}
                  <span className={RecipeCSS.recipe__publisher}>
                    {publisher}
                  </span>
                  . Please check out directions at their website.
                </p>
                <a
                  className={[RecipeCSS.btn__small, RecipeCSS.recipe__btn].join(
                    " "
                  )}
                  href={source_url}
                  target="_blank"
                >
                  <span>Directions</span>
                  <svg className={RecipeCSS.search__icon}>
                    <use href={`${Icons}#icon-arrow-right`}></use>
                  </svg>
                </a>
              </div>
            </div>
          )}
    </div>
  );
};

export default Recipe;
