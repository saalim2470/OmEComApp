import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken, userDetail } from "../../Constants/defaults";
import ProfileServices from "../../services/ProfileServices";
import AdContentServices from "../../services/AdContentServices";

const GetContentByUserId = createSlice({
  name: "getContentByUserId",
  initialState: {
    isLoading: false,
    contentData: null,
    error: null,
    isSuccess: false,
    otherUserDetail: null,
  },
  reducers: {
    setOtherUserContent: (state, action) => {
      state.contentData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOtherUserDetail: (state, action) => {
      state.otherUserDetail = action.payload;
    },
  },
});
export default GetContentByUserId.reducer;
export const { setLoading, setError, setOtherUserDetail, setOtherUserContent } =
  GetContentByUserId.actions;

export const getContentByUserIdApi =
  (userId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const contentResponce = await AdContentServices.getAdContentByUserId(
        userId,
        pageNumber,
        pageSize
      );
      dispatch(setOtherUserContent(contentResponce?.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      console.log("-=-=-get content  error-=-=-", error.response.data);
    }
  };
export const getOtherUserInfoApi = (userId) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await ProfileServices.getOtherUserInfo(userId);
    dispatch(setOtherUserDetail(responce.data));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-get user info error-=-=-", error.response.data);
  }
};