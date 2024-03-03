import { createSlice } from "@reduxjs/toolkit";
import NotificationServices from "../../services/NotificationServices";

const GetUserReadNotification = createSlice({
  name: "getUserReadNotification",
  initialState: {
    isLoading: false,
    readNotificationData: null,
    error: null,
  },
  reducers: {
    setReadNotificationDat: (state, action) => {
      state.readNotificationData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default GetUserReadNotification.reducer;
export const { setReadNotificationDat, setLoading, setError } = GetUserReadNotification.actions;

export const getUserReadNotificationApi = (notificationId) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await NotificationServices.UserReadNotification(notificationId)
    dispatch(setReadNotificationDat(responce.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
