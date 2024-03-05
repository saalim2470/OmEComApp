import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const GetAdContentById = createSlice({
  name: "getAdContentById",
  initialState: {
    isLoading: false,
    contentData: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    setContentDataById: (state, action) => {
      state.contentData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetAdContentDataById: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
      state.contentData = null;
    },
  },
});
export default GetAdContentById.reducer;
export const {
  setContentDataById,
  setLoading,
  setError,
  resetAdContentDataById,
} = GetAdContentById.actions;

export const getAdContentByIdApi = (id) => async (dispatch) => {
  try {
    dispatch(resetAdContentDataById());
    dispatch(setLoading(true));
    const responce = await AdContentServices.getAdContentById(id);
    dispatch(setContentDataById(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=delete error-=-=-=", error);
  }
};
