import { createSlice } from "@reduxjs/toolkit";
import SearchServices from "../../services/SearchServices";

const SearchContentSlice = createSlice({
  name: "searchContent",
  initialState: {
    searchResult: [],
    error: null,
    isSuccess: false,
    isLoading: false,
    statusCode: null,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.searchResult = [
          ...state.searchResult,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.searchResult = action.payload?.Data?.items;
      }

      if (state.totalCount === state.searchResult.length) {
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
    resetSearchResultPage: (state, action) => {
      state.isReachedEnd = false;
      state.page = 1;
      state.totalCount = null;
    },
    setSearchResultPage: (state, action) => {
      state.page = action.payload;
    },
    resetSearchData: (state, action) => {
      state.error = null;
      state.searchResult = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.page = 1;
      state.isReachedEnd = false;
      state.totalCount = null;
    },
    resetSearchResultData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
  },
});
export default SearchContentSlice.reducer;
export const {
  setSearchResult,
  setLoading,
  setError,
  resetSearchResultPage,
  setSearchResultPage,
  resetSearchResultData,
} = SearchContentSlice.actions;

export const getSearchData =
  (keyword, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetSearchResultData());
      dispatch(setLoading(true));
      const responce = await SearchServices.getSearchData(
        keyword,
        pageNumber,
        pageSize
      );
      dispatch(setSearchResult(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
    }
  };
