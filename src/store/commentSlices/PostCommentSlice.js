import { createSlice } from "@reduxjs/toolkit";
import CommentServices from "../../services/CommentServices";

const PostCommentSlice = createSlice({
  name: "postComment",
  initialState: {
    isLoading: false,
    postComment: null,
    error: null,
    isSuccess: false,
    errorCode: null,
  },
  reducers: {
    setPostCommentRes: (state, action) => {
      state.postComment = action.payload;
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
    resetPostCommentData: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.postComment = null;
    },
  },
});
export default PostCommentSlice.reducer;
export const {
  setPostCommentRes,
  setLoading,
  setError,
  setErrorCode,
  resetPostCommentData,
} = PostCommentSlice.actions;

export const postCommentApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setErrorCode(null));
    dispatch(setLoading(true));
    const responce = await CommentServices.postComment(data);
    // dispatch(addCommentCountOnSavedContent(responce.data.Data))
    dispatch(setPostCommentRes(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("==-=post comment=-=-=-", error.response.data);
  }
};
