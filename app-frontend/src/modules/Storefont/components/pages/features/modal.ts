import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "showLogin",
  initialState: false,
  reducers: {
    open: () => true,
    close: () => false,
  },
});
export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
