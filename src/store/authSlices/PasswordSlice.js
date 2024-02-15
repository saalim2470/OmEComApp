import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";

const PasswordSlice = createSlice({
  name: "passwordSlice",
  initialState: {
    isLoading: false,
    error: null,
    errorCode: null,
    isSuccess: false,
    responce: null,
  },
  reducers: {
    setResponce: (state, action) => {
      state.responce = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    resetPasswordSliceData: (state, action) => {
      state.errorCode = null;
      state.error = null;
      state.responce = null;
    },
  },
});
export default PasswordSlice.reducer;
export const {
  setResponce,
  setLoading,
  setError,
  setErrorCode,
  resetPasswordSliceData,
} = PasswordSlice.actions;

export const forgotPasswordApi = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordSliceData());
    dispatch(setLoading(true));
    const responce = await AuthServices.forgotPassword(data);
    dispatch(setResponce(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-forgot password error-=-=-", error.response.data);
  }
};

export const resetPasswordApi = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordSliceData());
    dispatch(setLoading(true));
    const responce = await AuthServices.resetPassword(data);
    dispatch(setResponce(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response?.status));
    console.log("-=-=-forgot password error-=-=-", error.response.data);
  }
};
