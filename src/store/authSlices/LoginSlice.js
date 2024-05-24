import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken, userDetail } from "../../Constants/defaults";
import { resetUserAdContent } from "../profileSlices/GetUserContentSlice";
import { resetData } from "../addAdContentSlices/AddPostData";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    accessToken: null,
    error: null,
    isSuccess: false,
    userDetail: null,
    errorCode: null,
  },
  reducers: {
    logOut: (state, action) => {
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.userDetail = null;
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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setuserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    clearLoginSlice: (state, action) => {
      state.errorCode = null;
      state.accessToken = null;
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.userDetail = null;
    },
  },
});
export default LoginSlice.reducer;
export const {
  setToken,
  setLoading,
  setError,
  logOut,
  setAccessToken,
  setuserDetail,
  setErrorCode,
  clearLoginSlice,
} = LoginSlice.actions;

export const getLoginUser = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await AuthServices.login(data);
    await AsyncStorage.setItem(
      accessToken,
      JSON.stringify(responce?.data?.Data?.token)
    );
    const userResponce = await AuthServices.getUserInfo();
    await AsyncStorage.setItem(
      userDetail,
      JSON.stringify(userResponce?.data?.Data)
    );
    dispatch(setuserDetail(userResponce?.data?.Data));
    dispatch(setToken(responce?.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("-=-=-login error-=-=-", error.response.data);
  }
};

export const getLoggedInUSerInfo = () => async (dispatch) => {
  try {
    dispatch(setError(null));
    const userResponce = await AuthServices.getUserInfo();
    await AsyncStorage.setItem(
      userDetail,
      JSON.stringify(userResponce?.data?.Data)
    );
    dispatch(setuserDetail(userResponce?.data?.Data));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
  }
};
export const logout = async (dispatch) => {
  try {
    dispatch(logOut());
    dispatch(resetUserAdContent());
    dispatch(resetData());
    await AsyncStorage.removeItem(accessToken);
    await AsyncStorage.removeItem(userDetail);
  } catch (error) {}
};
