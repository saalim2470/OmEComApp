import { createSlice } from "@reduxjs/toolkit";
import ProfileServices from "../../services/ProfileServices";

const GetUserContentSlice = createSlice({
  name: "getUSerContent",
  initialState: {
    isLoading: false,
    userContentData: [],
    error: null,
    isSuccess: false,
    page: 0,
    pageSize: 10,
    totalCount: null,
    isReachedEnd: false,
    isMoreLoading: false,
  },
  reducers: {
    setUserContent: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.userContentData = [
          ...state.userContentData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.userContentData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.userContentData.length) {
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
    resetUserAdContent: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
    },
    setUserContentData: (state, action) => {
      state.userContentData = [];
    },
    setUserContentPage: (state, action) => {
      state.page = action.payload;
    },
    resetUserContentPage: (state, action) => {
      state.page = action.payload;
      state.isReachedEnd = false;
      state.totalCount = null;
    },
  },
});
export default GetUserContentSlice.reducer;
export const {
  setUserContent,
  setLoading,
  setError,
  resetUserAdContent,
  setUserContentPage,
  resetUserContentPage,
  setUserContentData
} = GetUserContentSlice.actions;

export const getUserContentApi = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(resetUserAdContent());
    dispatch(setLoading(true));
    const responce = await ProfileServices.getUserAdContent(
      pageNumber,
      pageSize
    );
    dispatch(setUserContent(responce?.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
