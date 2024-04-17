import React, { ComponentType } from "react";
import { portalModalTypes } from "../../common/component-types";

const LazyPortalModal: ComponentType<portalModalTypes> = React.lazy(
  () => import("./portalModal")
);
export default LazyPortalModal;
