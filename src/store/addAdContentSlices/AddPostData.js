import { createSlice } from "@reduxjs/toolkit";

const AddPostData = createSlice({
  name: "addPost",
  initialState: {
    files: null,
    category: null,
    itemDetail: null,
    formDataFiles: null,
  },
  reducers: {
    resetData: (state, action) => {
      state.files = null;
      state.category = null;
      state.itemDetail = null;
      state.formDataFiles = null;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
    setFormDataFiles: (state, action) => {
      state.formDataFiles = action.payload;
    },
  },
});
export default AddPostData.reducer;
export const {
  resetData,
  setFormDataFiles,
  setFiles,
  setCategory,
  setItemDetail,
} = AddPostData.actions;
