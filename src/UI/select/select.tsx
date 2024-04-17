import React from "react";
import "./select-style.scss";
import { selectTypes } from "../../common/component-types";

const CustomSelect = ({
  data,
  onChangefunction,
  errors,
  selectLabel,
  defaultOption,
}: selectTypes) => {
  return (
    <div className="select-container">
      <label className="select-state-label">{selectLabel}</label>
      <select
        name="selectedOption"
        value={data.selectedState}
        onChange={onChangefunction}
        className="select-option"
      >
        <option value="Andhra Pradesh">{defaultOption}</option>
        {data.statesData.map((state) => (
          <option key={state.state_id} value={state.state_name}>
            {state.state_name}
          </option>
        ))}
      </select>
      {errors.selectedState && (
        <div className="error-message">{errors.selectedState}</div>
      )}
    </div>
  );
};

export default CustomSelect;
