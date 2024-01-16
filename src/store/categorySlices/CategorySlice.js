import { createSlice } from "@reduxjs/toolkit";
import CategoryServices from "../../services/CategoryServices";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categoryData: [],
    error: null,
    statusCode: null,
    isSuccess: false,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 70,
    totalCount: null,
  },
  reducers: {
    setCategory: (state, action) => {
      // state.categoryData = action.payload;
      // return { ...state, categoryData: action.payload };
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.categoryData = [
          ...state.categoryData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.categoryData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.categoryData.length) {
        console.log("-=-=reached end-=-=2");
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
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    resetCategoryData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
    setCategoryPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export default CategorySlice.reducer;
export const {
  setCategory,
  setLoading,
  setError,
  setStatusCode,
  resetCategoryData,
  setCategoryPage,
} = CategorySlice.actions;

export const getCategoryData = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(resetCategoryData());
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
