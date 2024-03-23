import React from "react";

import "./App.scss";
import { router } from "./AppRoutes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
