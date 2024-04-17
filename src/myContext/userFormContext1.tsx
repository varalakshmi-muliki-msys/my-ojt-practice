import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { formSubmissionType } from "../common/component-types";
interface Props {
  children: React.ReactNode;
}
// interface UserData {
//   id: number;
//   firstName: string;
//   email: string;
// }

interface UserContextData {
  data: formSubmissionType[];
  updateContextData: (newData: formSubmissionType[]) => void;
}

const UserContext1 = createContext<UserContextData | undefined>(undefined);

export const useMyContext1 = (): UserContextData => {
  const context = useContext(UserContext1);
  if (!context) {
    throw new Error(
      "useMyContext1 must be used within a UserFormContextProvider1"
    );
  }
  return context;
};

export const UserFormContextProvider1: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<formSubmissionType[]>([]);

  useEffect(() => {
    const retrievedData = localStorage.getItem("userData");

    if (retrievedData) {
      setData(JSON.parse(retrievedData));
    } else {
      console.log("no data");
    }
  }, []);

  const updateContextData = (newData: formSubmissionType[]) => {
    console.log("test", newData);
    setData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <UserContext1.Provider value={{ data, updateContextData }}>
      {children}
    </UserContext1.Provider>
  );
};

UserFormContextProvider1.propTypes = {
  children: PropTypes.node.isRequired,
};
