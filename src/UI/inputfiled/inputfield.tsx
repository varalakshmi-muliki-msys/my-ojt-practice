import React from "react";
import { inputFiledTypes } from "../../common/component-types";
import "./inputfiled.scss";

const InputFiled = ({
  labelText = "",
  inputType = "text",
  placeholder = "",
  value,
  pattern,
  name,
  checked,
  min = "1",
  max = "100",
  onChange,
  onBlur,
}: inputFiledTypes) => {
  return (
    <div className="input-container">
      <label className="label-style" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="input-filed"
        type={inputType}
        min={inputType === "number" ? min : ""}
        max={inputType === "number" ? max : ""}
        name={name}
        pattern={pattern}
        value={value}
        onChange={onChange}
        checked={checked}
        id={name}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  );
};
export default InputFiled;
