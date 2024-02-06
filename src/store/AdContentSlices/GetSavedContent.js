import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetSavedContent = createSlice({
  name: "getSavedContent",
  initialState: {
    isLoading: false,
    savedContent: [],
    error: null,
    isSuccess: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
    isReachedEnd: false,
    isMoreLoading: false,
  },
  reducers: {
    setSavedContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.savedContent = [
          ...state.savedContent,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.savedContent = action.payload?.Data?.items;
      }

      if (state.totalCount === state.savedContent.length) {
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
    resetSavedAdContent: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
    },
    setSavedContentPage: (state, action) => {
      state.page = action.payload;
    },
    resetSavedAdContentPage: (state, action) => {
      state.page = 1;
      state.totalCount = null;
      state.isReachedEnd = false;
    },
  },
});
export default GetSavedContent.reducer;
export const {
  setSavedContent,
  setLoading,
  setError,
  resetSavedAdContent,
  setSavedContentPage,
  resetSavedAdContentPage,
} = GetSavedContent.actions;

export const getSavedContentApi =
  (pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetSavedAdContent());
      dispatch(setLoading(true));
      const responce = await AdContentServices.getSavedContent(
        pageNumber,
        pageSize
      );
      dispatch(setSavedContent(responce?.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      console.log(error.response.data);
    }
  };
