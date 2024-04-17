import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import "./usersNav.scss";

const UsersNav = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const routes = [
    { path: "/users", label: "Users" },
    { path: "/users/dataGrid", label: "Data-Grid" },
    { path: "/users/materilUi", label: "Material-UI" },
  ];

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        centered
        className="users-nav-container"
      >
        {routes.map((route, index) => (
          <Tab
            label={route.label}
            value={index}
            component={Link}
            to={route.path}
          />
        ))}
      </Tabs>
      <Outlet />
    </>
  );
};

export default UsersNav;
