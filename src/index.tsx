import React from "react";
import ReactDOM from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./locale/i18next";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { UserContextProvider } from "./myContext/myContext";
import ErrorBoundary from "./error-boundary/error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <I18nextProvider i18n={i18n}> */}
        <Provider store={store}>
          {/* <UserContextProvider> */}
            <App />
          {/* </UserContextProvider> */}
        </Provider>
      {/* </I18nextProvider> */}
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
