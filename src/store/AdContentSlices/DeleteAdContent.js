import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const DeleteAdContent = createSlice({
  name: "deleteAdContent",
  initialState: {
    isLoading: false,
    deleteData: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    setDeleteData: (state, action) => {
      state.deleteData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetDeleteAdContentData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
      state.deleteData = null;
    },
  },
});
export default DeleteAdContent.reducer;
export const { setDeleteData, setLoading, setError, resetDeleteAdContentData } =
  DeleteAdContent.actions;

export const deleteAdContentApi = (id) => async (dispatch) => {
  try {
    dispatch(resetDeleteAdContentData());
    dispatch(setLoading(true));
    const responce = await AdContentServices.deleteAdContent(id);
    dispatch(setDeleteData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=delete error-=-=-=", error);
  }
};
