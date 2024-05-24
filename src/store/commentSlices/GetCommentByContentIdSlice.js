import { createSlice } from "@reduxjs/toolkit";
import CommentServices from "../../services/CommentServices";

const GetCommentByContentIdSlice = createSlice({
  name: "getCommentByContentId",
  initialState: {
    isLoading: false,
    commentData: [],
    error: null,
    isSuccess: false,
    errorCode: null,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
    contentId:null
  },
  reducers: {
    setCommentData: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.commentData = [
          ...state.commentData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.commentData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.commentData.length) {
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
      state.error = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    resetCommentData: (state, action) => {
      state.error = null;
      state.errorCode = null;
      state.isSuccess = false;
    },
    setCommentPage: (state, action) => {
      state.page = action.payload;
    },
    resetCommentPage: (state, action) => {
      state.page = 1;
      state.isReachedEnd = false;
      state.totalCount = null;
      state.contentId=action.payload
      state.isSuccess=false
    },
  },
});
export default GetCommentByContentIdSlice.reducer;
export const {
  setCommentData,
  setLoading,
  setError,
  setErrorCode,
  resetCommentData,
  setCommentPage,
  resetCommentPage,
} = GetCommentByContentIdSlice.actions;

export const getCommentByContentIdApi =
  (contentId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetCommentData());
      dispatch(setLoading(true));
      const responce = await CommentServices.getCommentByContentId(
        contentId,
        pageNumber,
        pageSize
      );
      dispatch(setCommentData(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      dispatch(setErrorCode(error.response.status));
      console.log(error.response.data);
    }
  };
