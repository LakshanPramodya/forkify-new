import React from "react";

import SpinnerCSS from "./Spinner.module.css";
import Icons from "../../assets/icons.svg";

const Spinner = () => {
  return (
    <div>
      <div className={SpinnerCSS.spinner}>
        <svg>
          <use href={`${Icons}#icon-loader`}></use>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
