import React from "react";
import AddRecipeCSS from "./AddRecipe.module.css";
import Icons from "../../assets/icons.svg";
import Spinner from "../Spinner/Spinner";

const AddRecipe = function (props) {
  const {
    isAddRecipeHidden,
    setIsAddRecipeHidden,
    uploadRecipe,
    isSubmit,
    setIsSubmit,
    isLoadingUpload,
  } = props;

  const overlayCloseOnClick = function () {
    setIsAddRecipeHidden(true);
  };

  const uploadBtnOnClick = async function (event) {
    try {
      event.preventDefault();
      const dataArr = [...new FormData(event.target)];
      const ingredients = dataArr
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          const ingArr = ing[1].replaceAll(" ", "").split(",");
          if (ingArr.length !== 3)
            throw new Error(
              "⚠ Wrong ingredient format! Please use the correct format 😊"
            );
          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });
      const data = Object.fromEntries(dataArr);
      const newRecipe = {
        title: data.title,
        source_url: data.source_url,
        image_url: data.image_url,
        publisher: data.publisher,
        cooking_time: +data.cooking_time,
        servings: +data.servings,
        ingredients,
      };
      await uploadRecipe(newRecipe);
      setIsSubmit(true);
      setTimeout(() => {
        setIsAddRecipeHidden(true);
      }, 2500);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div
        className={[
          AddRecipeCSS.overlay,
          isAddRecipeHidden ? AddRecipeCSS.hidden : "",
        ].join(" ")}
        onClick={overlayCloseOnClick}
      ></div>

      <div
        className={[
          AddRecipeCSS.add_recipe_window,
          isAddRecipeHidden ? AddRecipeCSS.hidden : "",
        ].join(" ")}
      >
        <button
          className={AddRecipeCSS.btn__close_modal}
          onClick={overlayCloseOnClick}
        >
          &times;
        </button>
        {isSubmit ? (
          <div className="message">
            <div>
              <svg>
                <use href={`${Icons}#icon-smile`}></use>
              </svg>
            </div>
            <p>Recipe was successfully updated</p>
          </div>
        ) : isLoadingUpload ? (
          <Spinner />
        ) : (
          <form className={AddRecipeCSS.upload} onSubmit={uploadBtnOnClick}>
            <div className={AddRecipeCSS.upload__column}>
              <h3 className={AddRecipeCSS.upload__heading}>Recipe data</h3>
              <label>Title</label>
              <input defaultValue="TEST123" required name="title" type="text" />
              <label>URL</label>
              <input
                defaultValue="TEST123"
                required
                name="source_url"
                type="text"
              />
              <label>Image URL</label>
              <input
                defaultValue="TEST123"
                required
                name="image_url"
                type="text"
              />
              <label>Publisher</label>
              <input
                defaultValue="TEST123"
                required
                name="publisher"
                type="text"
              />
              <label>Prep time</label>
              <input
                defaultValue="45"
                required
                name="cooking_time"
                type="number"
              />
              <label>Servings</label>
              <input defaultValue="4" required name="servings" type="number" />
            </div>

            <div className={AddRecipeCSS.upload__column}>
              <h3 className={AddRecipeCSS.upload__heading}>Ingredients</h3>
              <label>Ingredient 1</label>
              <input
                defaultValue="0.5,kg,Rice"
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 2</label>
              <input
                defaultValue="1,,Avocado"
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 3</label>
              <input
                defaultValue=",,salt"
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <button className={["btn", AddRecipeCSS.upload__btn].join(" ")}>
              <svg>
                <use href={`${Icons}#icon-upload-cloud`}></use>
              </svg>
              <span>Upload</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddRecipe;
