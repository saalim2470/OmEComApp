import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import CategorySlice from "./categorySlices/CategorySlice";
import GetAdContentSlice from "./AdContentSlices/GetAdContentSlice";
import SearchContentSlice from "./searchContentSlices/SearchContentSlice";
import LoginSlice from "./authSlices/LoginSlice";
import AddPostData from "./addAdContentSlices/AddPostData";
import AddAdContent from "./AdContentSlices/AddAdContent";

const store = configureStore({
  reducer: {
    category: CategorySlice,
    getAddContentByCategory: GetAdContentSlice,
    searchContent: SearchContentSlice,
    login: LoginSlice,
    addPost: AddPostData,
    addAdContentData: AddAdContent,
  },
  middleware: [thunk],
});

export default store;
