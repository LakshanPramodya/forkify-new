import React from "react";

import Icons from "../../assets/icons.svg";

const Bookmarks = function (props) {
  const {
    bookmark: { id, image_url, title, publisher, key },
    getRecipe,
  } = props;

  const bookmarkOnClick = async function () {
    if (!id) return;
    await getRecipe(id);
  };

  return (
    <div>
      <li className="preview">
        <a
          className="preview__link"
          href=""
          onClick={(e) => {
            e.preventDefault();
            bookmarkOnClick();
          }}
        >
          <figure className="preview__fig">
            <img src={image_url} alt="Test" />
          </figure>
          <div className="preview__data">
            <h4 className="preview__title">{title}</h4>
            <p className="preview__publisher">{publisher}</p>
            <div
              className={["preview__user_generated", key ? "" : "hidden"].join(
                " "
              )}
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

export default Bookmarks;
