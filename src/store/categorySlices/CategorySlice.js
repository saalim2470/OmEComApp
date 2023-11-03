import { createSlice } from "@reduxjs/toolkit";
import CategoryServices from "../../services/CategoryServices";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categoryData: [],
    error: null,
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
  },
});
export default CategorySlice.reducer;
export const { setCategory, setLoading, setError } = CategorySlice.actions;

export const getCategoryData = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await CategoryServices.getCategory(pageNumber, pageSize);
    await dispatch(setCategory(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
  }
};
