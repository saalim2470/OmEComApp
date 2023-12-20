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
    isSuccess: false,
    isReachedEnd: false,
  },
  reducers: {
    setAdContent: (state, action) => {
      state.isSuccess = true;
      // console.log("-=-=-=in redu8vcer-=-=-=", action.payload);
      if (action.payload?.length == 0) {
        state.contentData = [];
      } else {
        state.contentData = [...state.contentData, ...action.payload];
      }
      if (action.payload?.length < 10) {
        state.isReachedEnd = true;
      } else {
        state.isReachedEnd = false;
      }
      // state.contentData = action.payload;
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
    setReachedEnd: (state, action) => {
      state.isReachedEnd = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetAdContentData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
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
  resetAdContentData,
  setReachedEnd,
} = GetAdContentSlice.actions;

export const getAdContentByCategory =
  (categoryId, pageNumber, pageSize) => async (dispatch) => {
    console.log("-=-=data in api-==--=", categoryId, pageNumber);
    try {
      dispatch(resetAdContentData());
      dispatch(setLoading(true));
      const responce = await AdContentServices.getContentByCategory(
        categoryId,
        pageNumber,
        pageSize
      );
      // console.log("-=-=-res outer-=-=", responce.data);
      // dispatch(setReachedEnd(false));
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
