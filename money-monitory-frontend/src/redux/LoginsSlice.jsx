import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  loading: false,
  secondaryLoading: false,
  otp: "",
  email:"",
  snackbarMsg: "",
  snackbarType:"success",
  isOtpSent: false,
  sessionID: "",
};

const loginSlice = createSlice({
  name: "loginRedux",
  initialState: {
    value: initialValues,
  },
  reducers: {
    updateState: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    reset: (state, action) => {
      state.value = initialValues;
    },
  },
});

export default loginSlice.reducer;
export const { updateState, reset } = loginSlice.actions;
