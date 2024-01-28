import { createSlice } from "@reduxjs/toolkit";

const StoreDataSlice = createSlice({
  name: "storeData",
  initialState: {
    categoryId: null,
  },
  reducers: {
    setCategoryId: (state, action) => {
      console.log("--=-=category id in redux-=-=-", action.payload);
      state.categoryId = action.payload;
    },
  },
});
export default StoreDataSlice.reducer;
export const { setCategoryId } = StoreDataSlice.actions;
