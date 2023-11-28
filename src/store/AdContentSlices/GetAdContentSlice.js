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
      state.contentData = action.payload;
    },
    addLikeContent: (state, action) => {
      state.contentData= state.contentData.map((item,index)=>{
        if (action.payload?.contentId === item?.id) {
          return { ...item, isCurrentUserLiked: action.payload.isLiked };
        }
        return item;
      })
    },
    saveContent: (state, action) => {
      state.contentData= state.contentData.map((item,index)=>{
        if (action.payload?.adContentID === item?.id) {
          return { ...item, isCurrentUserSaved: action.payload.isSaved };
        }
        return item;
      })
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
export const { setAdContent, addLikeContent, setLoading, setError ,saveContent} =
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
      await dispatch(setAdContent(responce.data?.Data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
    }
  };

export const addLikeOnContentApi = (data) => async (dispatch) => {
  console.log(data);
  try {
    const responce = await AdContentServices.addContentLike(data);
    await dispatch(addLikeContent(responce.data?.Data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response.data));
    console.log("-=-=-=like error-=-=-=", error);
  }
};

export const saveContentApi = (data) => async (dispatch) => {
  console.log(data);
  try {
    const responce = await AdContentServices.addContentSave(data);
    await dispatch(saveContent(responce.data?.Data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response.data));
    console.log("-=-=-=save error-=-=-=", error);
  }
};
