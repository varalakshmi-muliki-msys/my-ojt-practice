import React from "react";
import { MaterialInputFiledTypes } from "../../../common/component-types";
import { TextField } from "@mui/material";

export const MaterialInputField = ({
  labelText,
  defaultValue,
  id,
  type,
  variant,
  placeHolder,
  handleChange,
  error,
  inputName,
  helperText,
  handleErrors,
  value
}: MaterialInputFiledTypes) => {
  return (
    <TextField
      type={type}
      label={labelText}
      id={id}
      defaultValue={defaultValue}
      size="small"
      onChange={handleChange}
      variant={variant}
      placeholder={placeHolder}
      error={error}
      helperText={helperText}
      onBlur={handleErrors}
      name={inputName}
      value={value}
    />
  );
};
