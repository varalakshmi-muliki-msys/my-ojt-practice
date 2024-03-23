import { Errors, userDataTypes } from "../../common/component-types";

export const validateForm = (userData: userDataTypes): Errors => {
  const validationErrors: Errors = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    selectedState: "",
  };

  if (!userData.firstName?.trim()) {
    validationErrors.firstName = "First Name is required";
  }

  if (!userData.lastName?.trim()) {
    validationErrors.lastName = "Last Name is required";
  }

  if (!userData.email?.trim()) {
    validationErrors.email = "Email is required";
  }

  if (userData.isIndian && !userData.selectedState?.trim()) {
    validationErrors.selectedState = "Please select a state";
  }

  return validationErrors;
};
