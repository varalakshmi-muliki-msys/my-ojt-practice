import { configureStore } from "@reduxjs/toolkit";
import selectedUsers from "./slice/userSlice";
import todoReducer from "./slice/todoSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    users: selectedUsers,
    todos: todoReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
