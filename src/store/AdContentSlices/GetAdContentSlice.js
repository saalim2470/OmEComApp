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
    isMoreLoading: false,
  },
  reducers: {
    setAdContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      if (state.contentData != null) {
        state.contentData = [
          ...state.contentData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.contentData = action.payload?.Data?.items;
      }
      if (action.payload?.Data?.items?.length === 0) {
        state.isReachedEnd = true;
      }
    },
    setLoading: (state, action) => {
      if (state.contentData != null) {
        state.isMoreLoading = action.payload;
        state.isLoading = false;
      } else {
        state.isLoading = action.payload;
      }
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
      state.isReachedEnd = false;
    },
    resetAdContent: (state, action) => {
      state.contentData = null;
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
  resetAdContent,
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
export const getAllContentApi = (pageNumber, pageSize) => async (dispatch) => {
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
