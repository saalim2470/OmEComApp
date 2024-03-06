import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../../Constants/defaults";

const CreateAccountSlice = createSlice({
  name: "createAccount",
  initialState: {
    isLoading: false,
    error: null,
    isSuccess: false,
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCreateAccountData: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSuccess = false;
    },
  },
});
export default CreateAccountSlice.reducer;
export const { setLoggedIn, setLoading, setError, clearCreateAccountData } =
  CreateAccountSlice.actions;

export const createAccountApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await AuthServices.createAccount(data);
    dispatch(setLoggedIn(responce?.data?.Success));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-create account error-=-=-", error.response.data);
  }
};
