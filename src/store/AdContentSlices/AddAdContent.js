import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const AddAdContent = createSlice({
  name: "addAdContentData",
  initialState: {
    isLoading: false,
    addContentData: null,
    error: null,
    errorCode: null,
  },
  reducers: {
    setContentResponce: (state, action) => {
      return { ...state, addContentData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
      state.errorCode = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reseAdPosttData: (state, action) => {
      state.addContentData = null;
      state.error = null;
      state.errorCode = null;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});
export default AddAdContent.reducer;
export const {
  reseAdPosttData,
  setContentResponce,
  setLoading,
  setError,
  setErrorCode,
} = AddAdContent.actions;

export const addAdContentApi = (data, id) => async (dispatch) => {
  console.log("-=-id-=-", id);
  try {
    dispatch(setLoading(true));
    console.log('-=-=-add form data-=-=',JSON.stringify(data));
    const responce = await AdContentServices.addAdContent(data, id);
    await dispatch(setContentResponce(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("-=-=-=error in ad content-=-0=-", error);
  }
};
