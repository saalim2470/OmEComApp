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

export const getSubscriptionPlanId =
  (subscriptionId, data) => async (dispatch) => {
    console.log('=-=-subs without data-=-=',subscriptionId,data);
    try {
      console.log('-=-line 45');
      dispatch(setLoading(true));
      console.log('-=-line 47');
      const responce = await SubscriptionServices.getSubscriptionPlan(
        subscriptionId,
        data
      );
      console.log('-=-line 52');
      dispatch(setSubscriptionPlanData(responce.data));
      console.log('-=-line 54');
      console.log("---getSubscription-=-", responce.data);
      dispatch(setLoading(false));
    } catch (error) {
      console.log('-=-line 58');
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
      dispatch(setErrorCode(error.response.status));
      console.log(error);
    }
  };
