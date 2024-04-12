import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  step: 0,
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  otpSent: "",
  emailOtp: "",
  phoneOtp: "",
  primaryLoading: false,
  secondaryLoading: false,
  isOtpSent: false,
  sessionId: "",
  snackbarMsg: "",
  snankbarType: "success",
};

const registerSlice = createSlice({
  name: "registerRedux",
  initialState: { value: initialValues },
  reducers: {
    updateState: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    reset: (state, action) => {
      state.value = initialValues;
    },
  },
});

export default registerSlice.reducer;
export const { updateState, reset } = registerSlice.actions;
