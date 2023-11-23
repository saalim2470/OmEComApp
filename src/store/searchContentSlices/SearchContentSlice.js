import { createSlice } from "@reduxjs/toolkit";
import SearchServices from "../../services/SearchServices";

const SearchContentSlice = createSlice({
  name: "searchContent",
  initialState: {
    isLoading: false,
    searchResult: [],
    error: null,
  },
  reducers: {
    setSearchResult: (state, action) => {
      return { ...state, searchResult: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default SearchContentSlice.reducer;
export const { setSearchResult, setLoading, setError } =
  SearchContentSlice.actions;

export const getSearchData =
  (keyword, pageNumber, pageSize) => async (dispatch) => {
    try {
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
