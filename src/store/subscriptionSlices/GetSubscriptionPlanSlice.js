import { createSlice } from "@reduxjs/toolkit";
import SubscriptionServices from "../../services/SubscriptionServices";

const GetSubscriptionPlanSlice = createSlice({
  name: "getSubscriptionPlan",
  initialState: {
    isLoading: false,
    subscriptionPlanData: null,
    error: null,
    errorCode: null,
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
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    resetGetSubscriptionPlanData: (state, action) => {
      state.error = null;
      state.subscriptionPlanData = null;
      state.errorCode = null;
    },
  },
});
export default GetSubscriptionPlanSlice.reducer;
export const {
  setSubscriptionPlanData,
  setLoading,
  setError,
  setErrorCode,
  resetGetSubscriptionPlanData,
} = GetSubscriptionPlanSlice.actions;

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
    dispatch(setErrorCode(error.response.status));
    console.log(error);
  }
};
