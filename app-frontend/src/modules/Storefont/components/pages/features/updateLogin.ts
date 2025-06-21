import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface updateLoginTs {
  fullname: string | undefined;
  phone_number: string | undefined;
  email: string | undefined;
}

const initialState: updateLoginTs = {
  fullname: undefined,
  phone_number: undefined,
  email: undefined,
};

const updateLoginSlice = createSlice({
  name: "updateLogin",
  initialState,
  reducers: {
    setUpdateLogin(state, action: PayloadAction<updateLoginTs>) {
      state.fullname = action.payload.fullname;
      state.phone_number = action.payload.phone_number;
      state.email = action.payload.email;
    },
    setClear(state) {
      state.fullname = undefined;
      state.phone_number = undefined;
      state.email = undefined;
    },
  },
});

export const { setUpdateLogin, setClear } = updateLoginSlice.actions;
export default updateLoginSlice.reducer;
