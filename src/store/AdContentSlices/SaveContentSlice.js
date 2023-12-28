import { createSlice } from "@reduxjs/toolkit";
import AdContentServices from "../../services/AdContentServices";

const SaveContentSlice = createSlice({
  name: "saveContent",
  initialState: {
    isLoading: false,
    saveData: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    addSaveContent: (state, action) => {
      state.saveData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetSaveData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
  },
});
export default SaveContentSlice.reducer;
export const { addSaveContent, setLoading, setError, resetSaveData } =
  SaveContentSlice.actions;

export const saveContentApi = (data) => async (dispatch) => {
  try {
    dispatch(resetSaveData());
    const responce = await AdContentServices.addContentSave(data);
    dispatch(addSaveContent(responce.data));
    console.log(responce.data);
  } catch (error) {
    dispatch(setError(error.response));
    console.log("-=-=-=save error-=-=-=", error);
  }
};
