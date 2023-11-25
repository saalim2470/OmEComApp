import { createSlice } from "@reduxjs/toolkit";
import SubscriptionServices from "../../services/SubscriptionServices";

const GetSubscriptionPlanSlice = createSlice({
  name: "getSubscriptionPlan",
  initialState: {
    isLoading: false,
    subscriptionPlanData: {},
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSubscriptionPlanData: (state, action) => {
      state.subscriptionPlanData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetSubscriptionPlanSlice.reducer;
export const { setSubscriptionPlanData, setLoading, setError } =
  GetSubscriptionPlanSlice.actions;

export const getSubscriptionPlanId = (subscriptionId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await SubscriptionServices.getSubscriptionPlan(
      subscriptionId
    );
    await dispatch(setSubscriptionPlanData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error);
  }
};
