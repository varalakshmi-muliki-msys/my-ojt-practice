import React, { useState, useEffect } from "react";
import "./form.scss";
import { DataGridComponent } from "./dataGrid/dataGrid";
import {
  Errors,
  formSubmissionType,
  userDataTypes,
} from "../../common/component-types";
import { validateForm } from "./helper";
import { useMyContext1 } from "../../myContext/userFormContext1";
import "../../App.scss";
import { InputFiled } from "../../UI/inputfiled/inputfield";
import { CustomSelect } from "../../UI/select/select";
import { PortalModal } from "../../UI/portalModal/portalModal";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-router-dom";

export const UserForm = () => {
  const { data, updateContextData } = useMyContext1();
  const [showModal, setShowModal] = useState(false);

  const [formSubmissionData, setFormSubmissionData] = useState<
    formSubmissionType[]
  >([]);

  useEffect(() => {
    if (data) {
      setFormSubmissionData(data);
    }
  }, [data]);

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

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    selectedState: "",
  });

  useEffect(() => {
    fetchDropdownOptions();
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
    data?.map((eachuser: { email: string | undefined }) => {
      if (eachuser.email === submissionData.email) {
        isDuplicate = true;
      }
    });
    console.log("check", isDuplicate);
    return isDuplicate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleStateChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setUserData({ ...userData, selectedState });
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let validationError = "";

    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          validationError = "Only alphabets are allowed";
        }
        break;
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          validationError = "Only alphabets are allowed";
        }
        break;
      case "age":
        if (!/^\d+$/.test(value)) {
          validationError = "Age must be a number";
        }
        break;
      case "email":
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          validationError = "Invalid email address";
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: validationError });
  };

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

  return (
    <div className="total-container">
      <Form
        className="form-container"
        action="/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h2 className="form-title">User Details</h2>

        <InputFiled
          labelText="First Name"
          name="firstName"
          onChange={handleChange}
          value={userData.firstName ?? ""}
          onBlur={handleBlur}
        />
        {errors.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}

        <InputFiled
          labelText="Last Name"
          name="lastName"
          onChange={handleChange}
          value={userData.lastName ?? ""}
          onBlur={handleBlur}
        />
        {errors.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}
        <InputFiled
          labelText="Email"
          inputType="email"
          name="email"
          onChange={handleChange}
          value={userData.email ?? ""}
          onBlur={handleBlur}
        />
        {errors.firstName && (
          <div className="error-message">{errors.email}</div>
        )}
        <InputFiled
          labelText="Age"
          name="age"
          onChange={handleChange}
          value={userData.age ?? ""}
          inputType="number"
        />
        {errors.age && <div className="error-message">{errors.age}</div>}

        <div className="radio-btns-wrapper">
          <div className="radio-btns-container">
            <span>Are you an Indian?</span>
            <InputFiled
              inputType="radio"
              labelText=""
              checked={userData.isIndian}
              name="yes"
              value="yes"
              onChange={handleIndianChange}
              onBlur={handleBlur}
            />
            <p className="label-yes">Yes</p>
          </div>
        </div>

        {userData?.isIndian && (
          <CustomSelect
            data={userData}
            onChangefunction={handleStateChangeValue}
            errors={errors}
            selectLabel="Select State"
            defaultOption="Andhra Pradesh"
          />
        )}
        <div className="btn-container">
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </Form>

      {data?.length > 0 && (
        <DataGridComponent formSubmissionData={formSubmissionData} />
      )}

      {showModal && (
        <div className="clipping-container ">
          <PortalModal
            showModal={showModal}
            setShowModal={setShowModal}
            modalText="User already Exist"
          />
        </div>
      )}
    </div>
  );
};
