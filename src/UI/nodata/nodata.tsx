import React from "react";
import "../errorPage/errorPage.scss";

export const Nodata = () => {
  return (
    <div className="error-page-wrapper">
      <img
        src="https://assets-v2.lottiefiles.com/a/0e30b444-117c-11ee-9b0d-0fd3804d46cd/BkQxD7wtnZ.gif"
        alt="no data"
        className="error-gif"
      />
      <h5>Sorry!!! No data found</h5>
    </div>
  );
};
