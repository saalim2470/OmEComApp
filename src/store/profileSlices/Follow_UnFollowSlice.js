import { createSlice } from "@reduxjs/toolkit";
import ProfileServices from "../../services/ProfileServices";

const Follow_UnFollowSlice = createSlice({
  name: "follow_UnFollowSlice",
  initialState: {
    isLoading: false,
    followResData: null,
    error: null,
    errorCode: null,
  },
  reducers: {
    setFollow_UnFollowData: (state, action) => {
      state.followResData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetFollow_UnFollowData: (state, action) => {
      state.followResData = null;
      state.error = null;
      state.errorCode = null;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});
export default Follow_UnFollowSlice.reducer;
export const {
  setFollow_UnFollowData,
  setLoading,
  setError,
  resetFollow_UnFollowData,
  setErrorCode,
} = Follow_UnFollowSlice.actions;

export const followUserApi = (data) => async (dispatch) => {
  try {
    dispatch(resetFollow_UnFollowData());
    dispatch(setLoading(true));
    const responce = await ProfileServices.followUser(data);
    await dispatch(setFollow_UnFollowData(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("-=-=-=error in ad follow-=-0=-", error);
  }
};
