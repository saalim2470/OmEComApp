import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../../Constants/defaults";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    accessToken: null,
    error: null,
    isSuccess: false,
  },
  reducers: {
    logOut: (state, action) => {
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
    setToken: (state, action) => {
      return {
        ...state,
        accessToken: action.payload?.Data?.token,
        isSuccess: action.payload?.Success,
      };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default LoginSlice.reducer;
export const { setToken, setLoading, setError, logOut } = LoginSlice.actions;

export const getLoginUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await AuthServices.login(data);
    await AsyncStorage.setItem(
      accessToken,
      JSON.stringify(responce?.data?.Data?.token)
    );
    dispatch(setToken(responce?.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-login error-=-=-", error.response.data);
  }
};
