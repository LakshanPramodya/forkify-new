import React, { useState } from "react";

import Logo from "../../assets/logo.png";
import Icons from "../../assets/icons.svg";
import HeaderCSS from "./Header.module.css";
import Bookmarks from "./Bookmarks";

const Header = function (props) {
  const {
    getResults,
    bookmarks,
    getRecipe,
    setIsAddRecipeHidden,
    setIsSubmit,
  } = props;
  const [input, setInput] = useState("");

  const searchBtnOnClick = async function () {
    if (!input) return;
    await getResults(input);
    setInput("");
  };

  const addRecipeBtnOnClick = function () {
    setIsAddRecipeHidden(false);
    setIsSubmit(false);
  };

  return (
    <header className={HeaderCSS.header}>
      <img src={Logo} alt="Logo" className={HeaderCSS.header__logo} />
      <form className={HeaderCSS.search}>
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          className={HeaderCSS.search__field}
          placeholder="Search over 1,000,000 recipes..."
        />
        <button
          className={["btn", HeaderCSS.search__btn].join(" ")}
          onClick={(e) => {
            e.preventDefault();
            searchBtnOnClick();
          }}
        >
          <svg className={HeaderCSS.search__icon}>
            <use href={`${Icons}#icon-search`}></use>
          </svg>
          <span>Search</span>
        </button>
      </form>

      <nav className={HeaderCSS.nav}>
        <ul className={HeaderCSS.nav__list}>
          <li className={HeaderCSS.nav__item}>
            <button
              className={[
                HeaderCSS.nav__btn,
                HeaderCSS.nav__btn__add_recipe,
              ].join(" ")}
              onClick={addRecipeBtnOnClick}
            >
              <svg className={HeaderCSS.nav__icon}>
                <use href={`${Icons}#icon-edit`}></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
          <li className={HeaderCSS.nav__item}>
            <button
              className={[
                HeaderCSS.nav__btn,
                HeaderCSS.nav__btn__bookmarks,
              ].join(" ")}
            >
              <svg className={HeaderCSS.nav__icon}>
                <use href={`${Icons}#icon-bookmark`}></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className={HeaderCSS.bookmarks}>
              <ul className={HeaderCSS.bookmarks__list}>
                {bookmarks.length === 0 && (
                  <div className="message">
                    <div>
                      <svg>
                        <use href={`${Icons}#icon-alert-triangle`}></use>
                      </svg>
                    </div>
                    <p>No bookmarks yet. Find a nice recipe and bookmark it.</p>
                  </div>
                )}

                {bookmarks &&
                  bookmarks.map((bookmark) => {
                    return (
                      <Bookmarks
                        key={bookmark.id}
                        bookmark={bookmark}
                        getRecipe={getRecipe}
                      />
                    );
                  })}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
