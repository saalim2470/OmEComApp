import { createSlice } from "@reduxjs/toolkit";
import CategoryServices from "../../services/CategoryServices";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categoryData: [],
    error: null,
    statusCode: null,
  },
  reducers: {
    setCategory: (state, action) => {
      // state.categoryData = action.payload;
      return { ...state, categoryData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
  },
});
export default CategorySlice.reducer;
export const { setCategory, setLoading, setError, setStatusCode } =
  CategorySlice.actions;

export const getCategoryData = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setStatusCode(null));
    dispatch(setLoading(true));
    const responce = await CategoryServices.getCategory(pageNumber, pageSize);
    dispatch(setCategory(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setStatusCode(error.response.status));
    dispatch(setCategory([]));
    console.log("-=-=error", error);
  }
};
