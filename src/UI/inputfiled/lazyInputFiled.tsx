import React, { ComponentType } from "react";
import { inputFiledTypes } from "../../common/component-types";

const LazyInputFiled: ComponentType<inputFiledTypes> = React.lazy(
  () => import("./inputfield")
);
export default LazyInputFiled;
