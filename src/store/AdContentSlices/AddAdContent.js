import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const AddAdContent = createSlice({
  name: "addAdContentData",
  initialState: {
    isLoading: false,
    addContentData: null,
    error: null,
  },
  reducers: {
    setContentResponce: (state, action) => {
      return { ...state, addContentData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reseAdPosttData: (state, action) => {
      state.addContentData = null;
    },
  },
});
export default AddAdContent.reducer;
export const { reseAdPosttData, setContentResponce, setLoading, setError } =
  AddAdContent.actions;

export const addAdContentApi = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await AdContentServices.addAdContent(data);
    await dispatch(setContentResponce(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
  }
};
