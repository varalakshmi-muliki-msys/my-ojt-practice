import React, { useState } from "react";
import DataGrid, {
  Pager,
  Paging,
  Selection,
  DataGridTypes,
  HeaderFilter,
} from "devextreme-react/data-grid";
import { formSubmissionType } from "../../../common/component-types";
import { useDispatch } from "react-redux";
import { storeSelectedUsers } from "../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import "./data-grid-style.scss";

interface Props {
  formSubmissionData: formSubmissionType[];
}

export const DataGridComponent = ({ formSubmissionData }: Props) => {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    DataGridTypes.SelectionChangedEvent[]
  >([]);

  const [isSelectionEnabled, setSelectionenabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { dataField: "firstName", caption: "First Name" },
    { dataField: "lastName", caption: "Last Name" },
    { dataField: "age", caption: "Age" },
    { dataField: "email", caption: "Email" },
    { dataField: "selectedState", caption: "State" },
    { dataField: "isIndian", caption: "Indian" },
  ];

  const handleSelectionChanged = (e: DataGridTypes.SelectionChangedEvent) => {
    setSelectedRowKeys(e.selectedRowsData);
    e.selectedRowKeys.length > 0
      ? setSelectionenabled(true)
      : setSelectionenabled(false);
  };

  const handleSubmittedUsers = () => {
    console.log("selectedRows", selectedRowKeys);
    dispatch(storeSelectedUsers(selectedRowKeys));
    navigate("/users");
  };

  return (
    <div className="data-grid-container">
      <p className="table-title">List Of Users:</p>
      <DataGrid
        dataSource={formSubmissionData}
        columns={columns}
        columnAutoWidth={true}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        showBorders={true}
        width="100%"
        keyExpr="id"
        onSelectionChanged={handleSelectionChanged}
      >
        <HeaderFilter allowSearch={true} visible={true} />
        <Selection
          mode="multiple"
          selectAllMode="allPages"
          showCheckBoxesMode="always"
        />
        <Paging enabled={true} defaultPageSize={5} />
        <Pager showInfo={true} showNavigationButtons />
      </DataGrid>
      {isSelectionEnabled && (
        <button onClick={handleSubmittedUsers} className="submit-users-btn">
          Submit
        </button>
      )}
    </div>
  );
};
