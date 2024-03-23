import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./usersNav.scss";

export const UsersNav = () => {
  return (
    <>
      <div className="users-nav-container">
        <NavLink
          end
          to="/users"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/users/dataGrid"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Data Grid
        </NavLink>
        <NavLink
          to="/users/materilUi"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Material UI
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
