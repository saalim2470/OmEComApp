import { createSlice } from "@reduxjs/toolkit";
import SubscriptionServices from "../../services/SubscriptionServices";

const SubscriptionTypeRulesSlice = createSlice({
  name: "subscriptionTypeRulesSlice",
  initialState: {
    isLoading: false,
    subscriptionTypeRulesData: null,
    error: null,
    errorCode: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSubscriptionTypeRulesData: (state, action) => {
      state.subscriptionTypeRulesData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});
export default SubscriptionTypeRulesSlice.reducer;
export const { setSubscriptionTypeRulesData, setLoading, setError, setErrorCode } =
  SubscriptionTypeRulesSlice.actions;

export const getSubscriptionTypeRulesApi = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responce = await SubscriptionServices.subscriptionTypeRules()
    await dispatch(setSubscriptionTypeRulesData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log(error);
  }
};
