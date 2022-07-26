import React, { useState } from "react";

import ResultsCSS from "./SearchResults.module.css";
import Icons from "../../assets/icons.svg";

const Pagination = function (props) {
  const { getRecipesPage, recipes, page, setPage } = props;
  const numPages = recipes && Math.ceil(recipes.length / 10);

  const prevOnClick = function () {
    getRecipesPage(page - 1);
    setPage(page - 1);
  };

  const nextOnClick = function () {
    getRecipesPage(page + 1);
    setPage(page + 1);
  };

  return (
    <div className={ResultsCSS.pagination}>
      {/* Page 1, other pages */}
      {page === 1 && numPages > 1 && (
        <button
          className={[
            ResultsCSS.btn__inline,
            ResultsCSS.pagination__btn__next,
          ].join(" ")}
          onClick={nextOnClick}
        >
          <span>Page {page + 1}</span>
          <svg className={ResultsCSS.search__icon}>
            <use href={`${Icons}#icon-arrow-right`}></use>
          </svg>
        </button>
      )}

      {/* Last page */}
      {page === numPages && numPages > 1 && (
        <button
          className={[
            ResultsCSS.btn__inline,
            ResultsCSS.pagination__btn__prev,
          ].join(" ")}
          onClick={prevOnClick}
        >
          <svg className={ResultsCSS.search__icon}>
            <use href={`${Icons}#icon-arrow-left`}></use>
          </svg>
          <span>Page {page - 1}</span>
        </button>
      )}

      {/* Other page */}
      {page !== 1 && page < numPages && (
        <div>
          <button
            className={[
              ResultsCSS.btn__inline,
              ResultsCSS.pagination__btn__prev,
            ].join(" ")}
            onClick={prevOnClick}
          >
            <svg className={ResultsCSS.search__icon}>
              <use href={`${Icons}#icon-arrow-left`}></use>
            </svg>
            <span>Page {page - 1}</span>
          </button>
          <button
            className={[
              ResultsCSS.btn__inline,
              ResultsCSS.pagination__btn__next,
            ].join(" ")}
            onClick={nextOnClick}
          >
            <span>Page {page + 1}</span>
            <svg className={ResultsCSS.search__icon}>
              <use href={`${Icons}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
