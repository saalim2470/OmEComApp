import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentSlice = createSlice({
  name: "getAddContentByCategory",
  initialState: {
    isLoading: false,
    contentData: [],
    error: null,
  },
  reducers: {
    setAdContent: (state, action) => {
      // state.contentData = action.payload;
      return { ...state, contentData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetAdContentSlice.reducer;
export const { setAdContent, setLoading, setError } = GetAdContentSlice.actions;

export const getAdContentByCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await AdContentServices.getContentByCategory(categoryId);
    await dispatch(setAdContent(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
  }
};
