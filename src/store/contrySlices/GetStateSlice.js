import { createSlice } from "@reduxjs/toolkit";
import CountryServices from "../../services/CountryServices";

const GetStateSlice = createSlice({
  name: "getState",
  initialState: {
    isLoading: false,
    stateData: null,
    error: null,
  },
  reducers: {
    setStateData: (state, action) => {
      return { ...state, stateData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetStateSlice.reducer;
export const { setStateData, setLoading, setError } = GetStateSlice.actions;

export const getStateData =
  (countryId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const responce = await CountryServices.getStateByCountryId(
        countryId,
        pageNumber,
        pageSize
      );
      await dispatch(setStateData(responce.data));
      dispatch(setLoading(false));
      console.log(responce.data);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      console.log(error.response.data);
    }
  };
