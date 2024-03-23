import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUsers: [] as Array<string>,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
  },
});

export const { storeSelectedUsers } = userSlice.actions;

export default userSlice.reducer;
