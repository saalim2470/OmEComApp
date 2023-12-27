import { createSlice } from "@reduxjs/toolkit";
import CommentServices from "../../services/CommentServices";

const GetCommentByContentIdSlice = createSlice({
  name: "getCommentByContentId",
  initialState: {
    isLoading: false,
    commentData: null,
    error: null,
    isSuccess: false,
    errorCode: null,
  },
  reducers: {
    setCommentData: (state, action) => {
      state.commentData = action.payload;
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
    resetCommentData: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.commentData = null;
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
} = GetCommentByContentIdSlice.actions;

export const getCommentByContentIdApi =
  (contentId, pageNumber, pageSize) => async (dispatch) => {
    console.log("-=-=-contenty id comment-=-=-=-", contentId);
    try {
      dispatch(setError(null));
      dispatch(setErrorCode(null));
      dispatch(setLoading(true));
      const responce = await CommentServices.getCommentByContentId(
        contentId,
        pageNumber,
        pageSize
      );
      dispatch(setCommentData(responce?.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      dispatch(setErrorCode(error.response.status));
      console.log(error.response.data);
    }
  };
