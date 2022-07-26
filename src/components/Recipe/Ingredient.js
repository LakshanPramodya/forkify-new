import React from "react";
import RecipeCSS from "./Recipe.module.css";
import Icons from "../../assets/icons.svg";

const Ingredient = function (props) {
  const { ing, servings, newServings } = props;
  const newQuantity = (ing.quantity * newServings) / servings;

  return (
    <div>
      <li className={RecipeCSS.recipe__ingredient}>
        <svg className={RecipeCSS.recipe__icon}>
          <use href={`${Icons}#icon-check`}></use>
        </svg>
        <div className={RecipeCSS.recipe__quantity}>
          {newQuantity !== 0 && newQuantity}
        </div>
        <div className={RecipeCSS.recipe__description}>
          <span className={RecipeCSS.recipe__unit}>{ing.unit} </span>
          {ing.description}
        </div>
      </li>
    </div>
  );
};

export default Ingredient;
