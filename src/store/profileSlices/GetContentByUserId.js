import { createSlice } from "@reduxjs/toolkit";
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
    statusCode: null,
  },
  reducers: {
    setOtherUserContent: (state, action) => {
      state.contentData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.data;
      state.statusCode = action.payload.status;
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
      dispatch(setError(error.response));
      console.log("-=-=-get content  error-=-=-", error.response.data);
    }
  };
export const getOtherUserInfoApi = (userId) => async (dispatch) => {
  console.log("---other uaer id-=-=-=", userId);
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await ProfileServices.getOtherUserInfo(userId);
    console.log("---other uaer id-=-=-=", responce.data);
    dispatch(setOtherUserDetail(responce.data));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response));
    console.log("-=-=-get user info error-=-=-", error);
  }
};
