import { createSlice } from "@reduxjs/toolkit";
import UploadAdServices from "../../services/UploadAdServices";

const PostBannerOrSliderSlice = createSlice({
  name: "postBannerOrSliderSlice",
  initialState: {
    isLoading: false,
    error: null,
    isSuccess: false,
    uploadAdsData: null,
  },
  reducers: {
    setUploadAdsRes: (state, action) => {
      state.uploadAdsData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUploadBannerSliderPostData: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.uploadAdsData = null;
      state.isSuccess = false;
    },
  },
});
export default PostBannerOrSliderSlice.reducer;
export const {
  setUploadAdsRes,
  setLoading,
  setError,
  resetUploadBannerSliderPostData,
} = PostBannerOrSliderSlice.actions;

export const postBannerOrSliderApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await UploadAdServices.postBannerOrSliderAd(data);
    dispatch(setUploadAdsRes(responce?.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-create upload ads error-=-=-", error.response.data);
  }
};
