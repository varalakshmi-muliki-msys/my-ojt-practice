import React, { ComponentType } from "react";
import {  selectTypes } from "../../common/component-types";

const LazySelect: ComponentType<selectTypes> = React.lazy(
  () => import("./select")
);
export default LazySelect;
