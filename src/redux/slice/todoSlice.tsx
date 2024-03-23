import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoData = createAsyncThunk("getTodoData", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  listOfTodos: [],
  hasError: false,
  status: "idle",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listOfTodos = action.payload;
      })
      .addCase(getTodoData.rejected, (state) => {
        state.status = "failed";
        state.hasError = true;
      });
  },
});

export default todoSlice.reducer;
