import { createSlice } from "@reduxjs/toolkit";
import ProfileServices from "../../services/ProfileServices";
import AdContentServices from "../../services/AdContentServices";

const GetContentByUserId = createSlice({
  name: "getContentByUserId",
  initialState: {
    isLoading: false,
    contentData: [],
    error: null,
    isSuccess: false,
    otherUserDetail: null,
    statusCode: null,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
  },
  reducers: {
    setOtherUserContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        console.log("-=-=-in greterb than page 1");
        state.contentData = [
          ...state.contentData,
          ...action.payload?.Data?.items,
        ];
      } else {
        console.log("-=-=-=-in page 1", action.payload);
        state.contentData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.contentData.length) {
        console.log("-=-=reached end-=-=2");
        state.isReachedEnd = true;
      }
    },
    setLoading: (state, action) => {
      if (state.page !== 1) {
        state.isMoreLoading = action.payload;
        state.isLoading = false;
      } else {
        state.isLoading = action.payload;
      }
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    setOtherUserDetail: (state, action) => {
      state.otherUserDetail = action.payload;
    },
    resetOtherUserContent: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
    setUserContentPage: (state, action) => {
      state.page = action.payload;
    },
    resetpageAndUserContent: (state, action) => {
      state.contentData = [];
      state.page = 1;
    },
  },
});
export default GetContentByUserId.reducer;
export const {
  setLoading,
  setError,
  setOtherUserDetail,
  setOtherUserContent,
  resetOtherUserContent,
  setUserContentPage,
  resetpageAndUserContent,
} = GetContentByUserId.actions;

export const getContentByUserIdApi =
  (userId, pageNumber, pageSize) => async (dispatch) => {
    console.log(
      `userId${userId} pageNumber ${pageNumber} pageSize ${pageSize}`
    );
    try {
      dispatch(resetOtherUserContent());
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
  try {
    dispatch(resetpageAndUserContent());
    dispatch(resetOtherUserContent());
    dispatch(setLoading(true));
    const responce = await ProfileServices.getOtherUserInfo(userId);
    dispatch(setOtherUserDetail(responce.data));
    dispatch(getContentByUserIdApi(responce.data?.Data?.userId, 1, 10));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response));
  }
};
