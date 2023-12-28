import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const UpdateAdContent = createSlice({
  name: "updateAdContentData",
  initialState: {
    isLoading: false,
    updateContentData: null,
    error: null,
    errorCode: null,
  },
  reducers: {
    setUpdateContent: (state, action) => {
      state.updateContentData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
      state.errorCode = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUpdateAdContent: (state, action) => {
      state.updateContentData = null;
      state.error = null;
      state.errorCode = null;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});
export default UpdateAdContent.reducer;
export const {
  resetUpdateAdContent,
  setUpdateContent,
  setLoading,
  setError,
  setErrorCode,
} = UpdateAdContent.actions;

export const updateAdContentApi = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setErrorCode(null));
    const responce = await AdContentServices.updateAdContent(data);
    await dispatch(setUpdateContent(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("-=-=-=error in update ad content-=-0=-", error);
  }
};
