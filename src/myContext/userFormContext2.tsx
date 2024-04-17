import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { formSubmissionType } from "../common/component-types";

interface Props {
  children: React.ReactNode;
}
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
// }

interface UserContextData {
  data: formSubmissionType[];
  updateContextData: (newData: formSubmissionType[]) => void;
}

export const UserContext2 = createContext<UserContextData | undefined>(
  undefined
);
export const useMyContext2 = (): UserContextData => {
  const context = useContext(UserContext2);
  if (!context) {
    throw new Error(
      "useMyContext1 must be used within a UserFormContextProvider1"
    );
  }
  return context;
};

export const UserFormContextProvider2: React.FC<Props> = ({ children }) => {
   const [data, setData] = useState<formSubmissionType[]>([]);

  useEffect(() => {
    const retrievedData = localStorage.getItem("formData");

    if (retrievedData) {
      setData(JSON.parse(retrievedData));
    } else {
      console.log("no data");
    }
  }, []);

  const updateContextData = (newData: formSubmissionType[]) => {
    console.log("test", newData);
    setData(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
  };
  return (
    <UserContext2.Provider value={{ data, updateContextData }}>
      {children}
    </UserContext2.Provider>
  );
};
UserFormContextProvider2.propTypes = {
  children: PropTypes.node.isRequired,
};
