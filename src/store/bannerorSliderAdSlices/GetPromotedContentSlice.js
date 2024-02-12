import { createSlice } from "@reduxjs/toolkit";
import UploadAdServices from "../../services/UploadAdServices";

const GetPromotedContentSlice = createSlice({
  name: "getPromotedContentSlice",
  initialState: {
    isLoading: false,
    promotedContent: [],
    error: null,
    statusCode: null,
    isSuccess: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
  },
  reducers: {
    setPromotedContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      state.promotedContent = action.payload?.Data?.items;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetPromotedContentData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
  },
});
export default GetPromotedContentSlice.reducer;
export const {
  setPromotedContent,
  setLoading,
  setError,
  resetPromotedContentData,
} = GetPromotedContentSlice.actions;

export const getPromotedContentApi =
  (pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetPromotedContentData());
      dispatch(setLoading(true));
      const responce = await UploadAdServices.getPromotedContent(
        pageNumber,
        pageSize
      );
      dispatch(setPromotedContent(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response));
      console.log("-=-=error in promoted content =-=-=", error);
    }
  };
