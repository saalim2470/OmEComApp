import { createSlice } from "@reduxjs/toolkit";
import CountryServices from "../../services/CountryServices";

const GetCitySlice = createSlice({
  name: "getCity",
  initialState: {
    isLoading: false,
    cityData: null,
    error: null,
  },
  reducers: {
    setCityData: (state, action) => {
      return { ...state, cityData: action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetCitySlice.reducer;
export const { setCityData, setLoading, setError } = GetCitySlice.actions;

export const getCityData =
  (stateId, pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const responce = await CountryServices.getCityByStateId(
        stateId,
        pageNumber,
        pageSize
      );
      await dispatch(setCityData(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      console.log(error.response.data);
    }
  };
