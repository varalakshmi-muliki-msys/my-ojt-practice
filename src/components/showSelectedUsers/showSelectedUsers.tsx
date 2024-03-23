import React from "react";
import { useSelector } from "react-redux";
import "./showSelectedUsers.scss";
import { useNavigate } from "react-router-dom";

import {
  ReduxStoreState,
  formSubmissionType,
} from "../../common/component-types";
import { Nodata } from "../../UI/nodata/nodata";

export const ShowSelectedUsers = () => {
  const selectedUsers: formSubmissionType[] = useSelector(
    (state: ReduxStoreState) => state.users.selectedUsers
  );

  console.log("a", selectedUsers);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      {!selectedUsers.length ? (
        <Nodata />
      ) : (
        <>
          <div className="show-users-container">
            <p className="">Selected users</p>

            {selectedUsers.map((eachUser, i) => (
              <div key={i} className="show-user-container">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-1556-528036.png"  alt="avatar" className="user-icon"/>
                <ul>
                  <li>{`Name :${eachUser.firstName} ${eachUser.lastName}`}</li>
                  <li>{`Age: ${eachUser.age}`}</li>
                  <li>{`Email ${eachUser.email}`}</li>
                </ul>
              </div>
            ))}
            <button className="back-btn" onClick={navigateToHome}>
              Back
            </button>
            {/* <a href="/">Click me</a> */}
          </div>
        </>
      )}
    </>
  );
};
