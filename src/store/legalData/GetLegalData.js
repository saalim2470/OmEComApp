import { createSlice } from "@reduxjs/toolkit";
import LegalDataServices from "../../services/LegalDataServices";

const GetLegalData = createSlice({
  name: "getLegalData",
  initialState: {
    isLoading: false,
    legalData: null,
    error: null,
  },
  reducers: {
    setLegalData: (state, action) => {
      state.legalData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetLegalData.reducer;
export const { setLegalData, setLoading, setError } = GetLegalData.actions;

export const getLegalDataApi = () => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await LegalDataServices.getLegalData();
    dispatch(setLegalData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
