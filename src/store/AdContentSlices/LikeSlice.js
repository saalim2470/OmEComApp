import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const LikeSlice = createSlice({
  name: "like",
  initialState: {
    isLoading: false,
    likeData: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    addLikeContent: (state, action) => {
      state.likeData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetLikeData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
  },
});
export default LikeSlice.reducer;
export const {
  addLikeContent,
  setLoading,
  setError,
  resetLikeData,
} = LikeSlice.actions;



export const addLikeOnContentApi = (data) => async (dispatch) => {
  try {
    dispatch(resetLikeData());
    const responce = await AdContentServices.addContentLike(data);
    dispatch(addLikeContent(responce.data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=like error-=-=-=", error);
  }
};


