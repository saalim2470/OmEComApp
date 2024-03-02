import { createSlice } from "@reduxjs/toolkit";

const StoreDataSlice = createSlice({
  name: "storeData",
  initialState: {
    categoryId: 0,
    searchFilterId: 0,
    expoPushToken:''
  },
  reducers: {
    setCategoryId: (state, action) => {
      console.log("--=-=category id in redux-=-=-", action.payload);
      state.categoryId = action.payload;
    },
    setSearchFilterId: (state, action) => {
      state.searchFilterId = action.payload;
    },
    setExpoPushToken:(state,action)=>{
      state.expoPushToken=action.payload
    }
  },
});
export default StoreDataSlice.reducer;
export const { setCategoryId, setSearchFilterId ,setExpoPushToken} = StoreDataSlice.actions;
