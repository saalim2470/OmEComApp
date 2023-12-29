import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentSlice = createSlice({
  name: "getAddContentByCategory",
  initialState: {
    isLoading: false,
    contentData: null,
    error: null,
    statusCode: null,
    isSuccess: false,
    isReachedEnd: false,
  },
  reducers: {
    setAdContent: (state, action) => {
      state.isSuccess = true;
      state.contentData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setReachedEnd: (state, action) => {
      state.isReachedEnd = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetAdContentData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
  },
});
export default GetAdContentSlice.reducer;
export const {
  setAdContent,
  setLoading,
  setError,
  resetAdContentData,
  setReachedEnd,
} = GetAdContentSlice.actions;

export const getAdContentByCategory =
  (categoryId, pageNumber, pageSize) => async (dispatch) => {
    console.log("-=-=data in api-==--=", categoryId, pageNumber);
    try {
      dispatch(resetAdContentData());
      dispatch(setLoading(true));
      const responce = await AdContentServices.getContentByCategory(
        categoryId,
        pageNumber,
        pageSize
      );
      // console.log("-=-=-res outer-=-=", responce.data);
      // dispatch(setReachedEnd(false));
      dispatch(setAdContent(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response));
    }
  };
  export const getAllContentApi =
  ( pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetAdContentData());
      dispatch(setLoading(true));
      const responce = await AdContentServices.getAllContent(
        pageNumber,
        pageSize
      );
      dispatch(setAdContent(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response));
    }
  };


