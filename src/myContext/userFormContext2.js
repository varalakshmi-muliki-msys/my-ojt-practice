import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext2 = createContext();

export const useMyContext2 = () => useContext(UserContext2);

export const UserFormContextProvider2 = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const retrievedData = localStorage.getItem("formData");

    if (retrievedData) {
      setData(JSON.parse(retrievedData));
    } else {
      console.log("no data");
    }
  }, []);

  const updateContextData = (newData) => {
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
