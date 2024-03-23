import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { formSubmissionType } from "../../../common/component-types";
import { useMyContext2 } from "../../../myContext/userFormContext2";
import "./materialUserTable.scss";

const columns = [
  { field: "firstName", headerName: "First Name" },
  { field: "lastName", headerName: "Last Name" },
  { field: "age", headerName: "Age" },
  { field: "email", headerName: "Email" },
  { field: "selectedState", headerName: "State" },
  { field: "isIndian", headerName: "Indian" },
];
interface Props {
  formSubmissionData: formSubmissionType[];
}
export const MaterialUserTable = ({ formSubmissionData }: Props) => {
  const { data } = useMyContext2();

  return (
    <Box className="material-ui-table-container">
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
