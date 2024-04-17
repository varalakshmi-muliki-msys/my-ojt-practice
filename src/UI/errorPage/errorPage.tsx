import React from "react";
import { ErrorResponse, useRouteError } from "react-router-dom";
import "./errorPage.scss";

 export const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;
  console.error(error);
  return (
    <div className="error-page-wrapper">
      <img
        src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
        alt="loading..."
        className="error-gif"
      />
      <p>Oops!</p>
      {/* <p>Sorry an unexpect error has occured</p> */}
      <p>{error.statusText}</p>
    </div>
  );
};

