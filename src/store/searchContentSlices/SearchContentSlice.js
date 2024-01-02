import { createSlice } from "@reduxjs/toolkit";
import SearchServices from "../../services/SearchServices";

const SearchContentSlice = createSlice({
  name: "searchContent",
  initialState: {
    isLoading: false,
    searchResult: null,
    error: null,
    isSuccess: false,
  },
  reducers: {
    setSearchResult: (state, action) => {
      if (state.searchResult != null) {
        state.searchResult = [
          ...state.searchResult,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.searchResult = action.payload?.Data?.items;
      }
      state.isSuccess = action.payload?.Success;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetSearchData: (state, action) => {
      state.error = null;
      state.searchResult = null;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});
export default SearchContentSlice.reducer;
export const { setSearchResult, setLoading, setError } =
  SearchContentSlice.actions;

export const getSearchData =
  (keyword, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const responce = await SearchServices.getSearchData(
        keyword,
        pageNumber,
        pageSize
      );
      await dispatch(setSearchResult(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
    }
  };
