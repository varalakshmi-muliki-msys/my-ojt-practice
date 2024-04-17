import React, { ReactNode } from "react";

export type TableDataTypes = {
  rowsData: Array<TableRow>;
  rowsPerPageOptions: Array<number>;
  tableData: TableDataItem[] | null;
  updatedata: () => void;
};
export type column = {
  label: string;
  field: string;
};

export type languageDropdownProps = {
  onOpenMenu: () => void;
};
export type TableDataItem = {
  id: number;
  avatar: string;
  fname: string;
  lname: string;
  username: string;
  email: string;
  // ... other properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Index signature allowing any string key
};

export interface TableRow {
  label: string;
  field: keyof TableDataItem;
}

export type testProps = {
  title: string;
};

export type editModal = {
  showEditModal: boolean;
  handleClose: () => void;
  rowDataIs: TableDataItem | undefined;
  updateData: () => void;
};
export type createUserTypes = {
  addUserModal: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
};

export type userData = {
  fname: string;
  lname: string;
  username: string;
  email: string;
  avatar: string;
  [key: string]: string;
};
export type StatesData = {
  state_id: string;
  state_name: string;
};
export type Errors = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  selectedState: string;
};

export type userDataTypes = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number | undefined;
  selectedState?: string;
  isIndian?: boolean;
  statesData: Array<StatesData>;
};

export type inputFiledTypes = {
  labelText?: string;
  inputType?: string;
  pattern?: string;
  email?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string | number;
  checked?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export type formSubmissionType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  selectedState?: string;
  isIndian?: boolean | string;
};

export type portalModalTypes = {
  modalText: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type selectTypes = {
  data: userDataTypes;
  onChangefunction: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: Errors;
  selectLabel?: string;
  defaultOption?: string;
};
export type ErrorBoundaryState = {
  hasError: boolean;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type TodoData = {
  id: number;
  userId: number;
  title: string;
  completed: string;
};

export type TodoState = {
  listOfTodos: TodoData[];
  hasError: boolean;
  status: string;
};
export type RootTodoState = {
  todo_list: TodoState;
};

export type TodoColumnData = {
  headerName: string;
  field: keyof TodoData;
  width?: number;
};

export type ReduxStoreState = {
  users: { selectedUsers: Array<object> };
  todos: TodoState;
};

export type TableSkeletonProps = {
  rowsNum: Number;
};

export type MaterialInputFiledTypes = {
  defaultValue?: string;
  labelText?: string;
  id?: string;
  inputName?: string;
  type?: string;
  value?: string | Number;
  variant?: "standard" | "outlined" | "filled";
  placeHolder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  handleErrors?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
