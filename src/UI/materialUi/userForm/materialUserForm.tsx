import React, { ReactNode, useEffect, useState } from "react";
import "./materialUserForm.scss";
import { MaterialInputField } from "../materialInputFiled/materialInputField";
import {
  InputLabel,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Errors,
  formSubmissionType,
  userDataTypes,
} from "../../../common/component-types";
import { v4 as uuidv4 } from "uuid";
import { useMyContext2 } from "../../../myContext/userFormContext2";
import LazyPortalModal from "../../portalModal/lazyPortalModal";
import { MaterialUserTable } from "../usertable/materialUserTable";
import { validateForm } from "../../../components/forms/helper";

export const MaterialUserForm = () => {
  const { data, updateContextData } = useMyContext2();
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState<userDataTypes>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: undefined,
    selectedState: "",
    isIndian: false,
    statesData: [],
  });

  const [formSubmissionData, setFormSubmissionData] = useState<
    formSubmissionType[]
  >([]);

  useEffect(() => {
    if (data) {
      setFormSubmissionData(data);
    }
  }, [data]);

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    selectedState: "",
  });
  useEffect(() => {
    fetchDropdownOptions();
    console.log("userdata", userData.statesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDropdownOptions = async () => {
    try {
      const response = await fetch(
        "https://cdn-api.co-vin.in/api/v2/admin/location/states"
      );
      const result = await response.json();
      setUserData({ ...userData, statesData: result.states });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicateUser = (submissionData: formSubmissionType) => {
    let isDuplicate = false;
    // eslint-disable-next-line array-callback-return
    data?.map((eachuser) => {
      if (eachuser.email === submissionData.email) {
        isDuplicate = true;
      }
    });

    return isDuplicate;
  };

  const [enableError, setEnableError] = useState({
    firstName: false,
    lastName: false,
    age: false,
    email: false,
  });

  const handleReset = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      selectedState: "",
      statesData: userData.statesData,
      isIndian: false,
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      selectedState: "",
    });
  };

  const handleErrors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let validationError = "";
    if (value === "") {
      validationError = "name is required";
      setErrors({ ...errors, [name]: "" });
      setEnableError({ ...enableError, [name]: false });
      return;
    }

    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          setEnableError({ ...enableError, firstName: true });
          validationError = "Only alphabets are allowed";
        } else {
          setEnableError({ ...enableError, firstName: false });
        }
        break;
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          setEnableError({ ...enableError, lastName: true });
          validationError = "Only alphabets are allowed";
        } else {
          setEnableError({ ...enableError, lastName: false });
        }
        break;
      case "age":
        if (!/^\d+$/.test(value)) {
          setEnableError({ ...enableError, age: true });
          validationError = "Age must be a number";
        } else {
          setEnableError({ ...enableError, age: false });
        }
        break;
      case "email":
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setEnableError({ ...enableError, email: true });
          validationError = "Invalid email address";
        } else {
          setEnableError({ ...enableError, email: false });
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: validationError });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = uuidv4();

    const validationErrors = validateForm(userData);
    if (
      validationErrors.firstName === "" &&
      validationErrors.lastName === "" &&
      validationErrors.email === "" &&
      validationErrors.email === "" &&
      validationErrors.age === ""
    ) {
      const isIndianText = userData.isIndian ? "Yes" : "No";
      const stateText =
        userData.selectedState === "" ? "_" : userData.selectedState;
      const submissionData = {
        id: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        email: userData.email,
        isIndian: isIndianText,
        selectedState: stateText,
      };
      const existingSubmissions = [...formSubmissionData];
      const isDuplicateUser = handleDuplicateUser(submissionData);
      if (isDuplicateUser) {
        setShowModal(true);
      } else {
        existingSubmissions.push(submissionData);
        setFormSubmissionData(existingSubmissions);
        updateContextData(existingSubmissions);
        handleReset();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleIndianChange = () => {
    setUserData({
      ...userData,
      isIndian: !userData.isIndian,
    });
  };
  const handleStateChangeValue = (
    e: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const selectedState = e.target.value;
    setUserData({ ...userData, selectedState });
  };

  return (
    <div>
      <div className="material-form-wrapper">
        <form className="material-ui-form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">User Details</h2>
          <MaterialInputField
            labelText="First Name"
            // id="firstName"
            type="text"
            handleChange={handleInputChange}
            handleErrors={handleErrors}
            helperText={errors.firstName}
            inputName="firstName"
            error={enableError.firstName}
            value={userData.firstName}
          />
          <MaterialInputField
            labelText="Last Name"
            id="lastName"
            type="text"
            handleChange={handleInputChange}
            handleErrors={handleErrors}
            helperText={errors.lastName}
            inputName="lastName"
            error={enableError.lastName}
            value={userData.lastName}
          />
          <MaterialInputField
            labelText="Email"
            id="email"
            type="email"
            handleChange={handleInputChange}
            handleErrors={handleErrors}
            helperText={errors.email}
            inputName="email"
            error={enableError.email}
            value={userData.email}
          />
          <MaterialInputField
            labelText="Age"
            id="age"
            type="number"
            handleChange={handleInputChange}
            handleErrors={handleErrors}
            helperText={errors.age}
            inputName="age"
            error={enableError.age}
            value={userData.age}
          />
          <div className="radio-btns-wrapper">
            <div className="radio-btns-container">
              <span>Are you an Indian?</span>
              <Radio
                checked={userData.isIndian}
                onChange={handleIndianChange}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <p className="label-yes">Yes</p>
            </div>
          </div>
          {userData.isIndian && (
            <>
              <InputLabel id="demo-customized-select-label">
                Select state
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                defaultValue="Delhi"
                value={userData.selectedState}
                // label="State"
                onChange={handleStateChangeValue}
              >
                {userData.statesData.map((state) => (
                  <MenuItem key={state.state_id} value={state.state_name}>
                    {state.state_name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          <div className="btn-container">
            <button className="submit-btn" type="submit">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>

        {showModal && (
          <div className="clipping-container ">
            <LazyPortalModal
              showModal={showModal}
              setShowModal={setShowModal}
              modalText="User already Exist"
            />
          </div>
        )}
      </div>
      {data?.length > 0 && (
        <MaterialUserTable formSubmissionData={formSubmissionData} />
      )}
    </div>
  );
};
