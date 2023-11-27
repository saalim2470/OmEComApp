import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentSlice = createSlice({
  name: "getAddContentByCategory",
  initialState: {
    isLoading: false,
    contentData: [],
    likeData: null,
    error: null,
  },
  reducers: {
    setAdContent: (state, action) => {
      // state.contentData = action.payload;
      return { ...state, contentData: action.payload };
    },
    addLikeContent: (state, action) => {
      state.likeData = action.payload;
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
export const { setAdContent, addLikeContent, setLoading, setError } =
  GetAdContentSlice.actions;

export const getAdContentByCategory =
  (categoryId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const responce = await AdContentServices.getContentByCategory(
        categoryId,
        pageNumber,
        pageSize
      );
      await dispatch(setAdContent(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
    }
  };

export const addLikeOnContentApi = (data) => async (dispatch) => {
  try {
    const responce = await AdContentServices.addContentLike(data);
    await dispatch(addLikeContent(responce.status));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response.data));
    console.log("-=-=-=like error-=-=-=", error.response.data);
  }
};
