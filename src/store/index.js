import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import CategorySlice from "./categorySlices/CategorySlice";
import GetAdContentSlice from "./AdContentSlices/GetAdContentSlice";
import SearchContentSlice from "./searchContentSlices/SearchContentSlice";
import LoginSlice from "./authSlices/LoginSlice";
import AddPostData from "./addAdContentSlices/AddPostData";
import AddAdContent from "./AdContentSlices/AddAdContent";
import GetCountrySlice from "./contrySlices/GetCountrySlice";
import GetStateSlice from "./contrySlices/GetStateSlice";
import GetCitySlice from "./contrySlices/GetCitySlice";
import CreateAccountSlice from "./authSlices/CreateAccountSlice";

const store = configureStore({
  reducer: {
    category: CategorySlice,
    getAddContentByCategory: GetAdContentSlice,
    searchContent: SearchContentSlice,
    login: LoginSlice,
    addPost: AddPostData,
    addAdContentData: AddAdContent,
    getCountry: GetCountrySlice,
    getState: GetStateSlice,
    getCity: GetCitySlice,
    createAccount: CreateAccountSlice,
  },
  middleware: [thunk],
});

export default store;
