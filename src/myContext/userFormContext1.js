import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext1 = createContext();

export const useMyContext1 = () => useContext(UserContext1);

export const UserFormContextProvider1 = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const retrievedData = localStorage.getItem("userData");

    if (retrievedData) {
      setData(JSON.parse(retrievedData));
    } else {
      console.log("no data");
    }
  }, []);

  const updateContextData = (newData) => {
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
