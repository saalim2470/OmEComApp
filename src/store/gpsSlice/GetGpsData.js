import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GetGpsData = createSlice({
  name: "gpsData",
  initialState: {
    isLoading: false,
    gpsData: [],
    error: null,
    statusCode: null,
    isSuccess: false,
  },
  reducers: {
    setGpsData: (state, action) => {
      state.gpsData = action.payload?.features;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
  },
});
export default GetGpsData.reducer;
export const { setGpsData, setLoading, setError, setStatusCode } =
  GetGpsData.actions;

export const getGpsDataApi = (location) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWZ6YWxwYXRlbDA5IiwiYSI6ImNscnl6YTRwYTFvNncya3RlMm43a3l4aXYifQ.zvQ0bjs4RBZp4jHf64d3ug`
    );
    dispatch(setGpsData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setStatusCode(error.response.status));
  }
};
