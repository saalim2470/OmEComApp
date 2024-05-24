import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentSlice = createSlice({
  name: "getAddContentByCategory",
  initialState: {
    isLoading: false,
    contentData: [],
    error: null,
    statusCode: null,
    isSuccess: false,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
  },
  reducers: {
    setAdContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.contentData = [
          ...state.contentData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.contentData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.contentData.length) {
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
    resetAdContent: (state, action) => {
      state.contentData = [];
      state.isReachedEnd = false;
      state.page = 1;
      state.totalCount = null;
    },
    resetPage: (state, action) => {
      state.page = 1;
      state.totalCount = null;
      state.isReachedEnd = false;
    },
    setGetAdContentPage: (state, action) => {
      state.page = action.payload;
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
  resetPage,
  setGetAdContentPage,
} = GetAdContentSlice.actions;

export const getAdContentByCategory =
  (categoryId, pageNumber, pageSize) => async (dispatch) => {
    try {
      
      dispatch(resetAdContentData());
      dispatch(setLoading(true));
      const responce = await AdContentServices.getContentByCategory(
        categoryId,
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
export const getAllContentApi = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(resetAdContentData());
    dispatch(setLoading(true));
    const responce = await AdContentServices.getAllContent(
      pageNumber,
      pageSize
    );
    console.log("---==get data 1");
    dispatch(setAdContent(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response));
    console.log("-=-=error in content =-=-=", error);
  }
};
