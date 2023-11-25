import { createSlice } from "@reduxjs/toolkit";
import SubscriptionServices from "../../services/SubscriptionServices";

const SubscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState: {
    isLoading: false,
    subscriptionData: [],
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSubscriptionData: (state, action) => {
      state.subscriptionData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default SubscriptionPlanSlice.reducer;
export const { setSubscriptionData, setLoading, setError } =
  SubscriptionPlanSlice.actions;

export const getSubscriptionPlan =
  (pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const responce = await SubscriptionServices.getSubscriptionPlanDetail(
        pageNumber,
        pageSize
      );
      await dispatch(setSubscriptionData(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      console.log(error);
    }
  };
