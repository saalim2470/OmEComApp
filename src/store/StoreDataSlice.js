import { createSlice } from "@reduxjs/toolkit";

const StoreDataSlice = createSlice({
  name: "storeData",
  initialState: {
    categoryId: null,
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});
export default StoreDataSlice.reducer;
export const { setCategoryId } = StoreDataSlice.actions;
