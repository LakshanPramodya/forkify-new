import React from "react";

import Icons from "../../assets/icons.svg";

const Result = function (props) {
  const { recipe, getRecipe } = props;

  const recipeOnClick = async function () {
    await getRecipe(recipe.id);
  };

  return (
    <div>
      <li className="preview">
        <a
          onClick={(e) => {
            e.preventDefault();
            recipeOnClick();
          }}
          className="preview__link"
          href=""
        >
          <figure className="preview__fig">
            <img src={recipe.image_url} alt="Test" />
          </figure>
          <div className="preview__data">
            <h4 className="preview__title">{recipe.title}</h4>
            <p className="preview__publisher">{recipe.publisher}</p>
            <div
              className={[
                "preview__user_generated",
                recipe.key ? "" : "hidden",
              ].join(" ")}
            >
              <svg>
                <use href={`${Icons}#icon-user`}></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    </div>
  );
};

export default Result;
