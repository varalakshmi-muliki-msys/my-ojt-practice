import React, { useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { ReduxStoreState, TodoColumnData } from "../../common/component-types";
import { getTodoData } from "../../redux/slice/todoSlice";
import { useAppDispatch } from "../../redux/store";
import "./ag-dataGrid.scss";
import { TableSkeletonLoader } from "../TableSkeleton/tableSkeleton";

export const AgDataGrid = () => {
  const dispatch = useAppDispatch();

  const listOfTodos = useSelector(
    (state: ReduxStoreState) => state.todos.listOfTodos
  );

  useEffect(() => {
    dispatch(getTodoData());
  }, [dispatch]);

  console.log("listOfTodos", listOfTodos);
  const columns: TodoColumnData[] = [
    {
      headerName: "ID",
      field: "id",
    },
    {
      headerName: "User Id",
      field: "userId",
    },
    {
      headerName: "Task",
      field: "title",
    },
    {
      headerName: "Status",
      field: "completed",
    },
  ];
  return (
    <div className="ag-data-grid-wrapper">
      <div className="ag-theme-quartz ag-data-inner-wrapper">
        {!listOfTodos.length  ? (
          <TableSkeletonLoader rowsNum={10} />
        ) : (
          <AgGridReact
            rowData={listOfTodos}
            columnDefs={columns}
            rowSelection="multiple"
            rowHeight={32}
            pagination={true}
            paginationPageSize={10}
          />
        )}
      </div>
    </div>
  );
};
