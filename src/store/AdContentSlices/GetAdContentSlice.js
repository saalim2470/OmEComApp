import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentSlice = createSlice({
  name: "getAddContentByCategory",
  initialState: {
    isLoading: false,
    contentData: [],
    likeData: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    setAdContent: (state, action) => {
      state.contentData = action.payload;
    },
    addLikeContent: (state, action) => {
      state.contentData = state.contentData.map((item, index) => {
        if (action.payload?.contentId === item?.id) {
          return { ...item, isCurrentUserLiked: action.payload.isLiked };
        }
        return item;
      });
    },
    saveContent: (state, action) => {
      state.contentData = state.contentData.map((item, index) => {
        if (action.payload?.adContentID === item?.id) {
          return { ...item, isCurrentUserSaved: action.payload.isSaved };
        }
        return item;
      });
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
  },
});
export default GetAdContentSlice.reducer;
export const {
  setAdContent,
  addLikeContent,
  setLoading,
  setError,
  saveContent,
} = GetAdContentSlice.actions;

export const getAdContentByCategory =
  (categoryId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const responce = await AdContentServices.getContentByCategory(
        categoryId,
        pageNumber,
        pageSize
      );
      dispatch(setAdContent(responce.data?.Data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response));
    }
  };

export const addLikeOnContentApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    const responce = await AdContentServices.addContentLike(data);
    dispatch(addLikeContent(responce.data?.Data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=like error-=-=-=", error);
  }
};

export const saveContentApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    const responce = await AdContentServices.addContentSave(data);
    dispatch(saveContent(responce.data?.Data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=save error-=-=-=", error);
  }
};
