import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserForm from "./components/forms/form";
import AgDataGrid from "./components/ag-datagrid/agDataGrid";
import {ErrorPage} from "./UI/errorPage/errorPage";
import UsersNav from "./components/usersNav/usersNav";
import ShowSelectedUsers from "./components/showSelectedUsers/showSelectedUsers";
import FormAndTable from "./UI/materialUi/formAndTable";
import { UserFormContextProvider1 } from "./myContext/userFormContext1";
import { UserFormContextProvider2 } from "./myContext/userFormContext2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserFormContextProvider1>
        <UserForm />
      </UserFormContextProvider1>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <UsersNav />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <ShowSelectedUsers />,
      },
      {
        path: "dataGrid",
        element: <AgDataGrid />,
      },
      {
        path: "materilUi",
        element: (
          <UserFormContextProvider2>
            <FormAndTable />
          </UserFormContextProvider2>
        ),
      },
    ],
  },
  {
    path: "/todos",
    element: <AgDataGrid />,
    errorElement: <ErrorPage />,
  },
]);
