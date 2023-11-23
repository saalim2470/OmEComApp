import { createSlice } from "@reduxjs/toolkit";
import CountryServices from "../../services/CountryServices";

const GetCountrySlice = createSlice({
  name: "getCountry",
  initialState: {
    isLoading: false,
    countryData: null,
    error: null,
  },
  reducers: {
    setCountryData: (state, action) => {
      return { ...state, countryData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetCountrySlice.reducer;
export const { setCountryData, setLoading, setError } = GetCountrySlice.actions;

export const getCountryData = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await CountryServices.getCountry(pageNumber, pageSize);
    await dispatch(setCountryData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
