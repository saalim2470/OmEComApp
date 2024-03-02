import { createSlice } from "@reduxjs/toolkit";
import NotificationServices from "../../services/NotificationServices";

const GetCurrentUserAllNotifications = createSlice({
  name: "getCurrentUserAllNotifications",
  initialState: {
    isLoading: false,
    notificationData: [],
    error: null,
    statusCode: null,
    isSuccess: false,
    isReachedEnd: false,
    isMoreLoading: false,
    page: 1,
    pageSize: 10,
    totalCount: null,
  },
  reducers: {
    setCurrentUserNotification: (state, action) => {
      state.isSuccess = action.payload?.Success;
      state.totalCount = action.payload?.Data?.totalCount;
      if (state.page !== 1) {
        state.notificationData = [
          ...state.notificationData,
          ...action.payload?.Data?.items,
        ];
      } else {
        state.notificationData = action.payload?.Data?.items;
      }

      if (state.totalCount === state.notificationData.length) {
        state.isReachedEnd = true;
      }
    },

    setLoading: (state, action) => {
      if (state.page !== 1) {
        state.isMoreLoading = action.payload;
        state.isLoading = false;
      } else {
        state.isLoading = action.payload;
      }
    },
    setReachedEnd: (state, action) => {
      state.isReachedEnd = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
      state.statusCode = action.payload?.status;
    },
    resetCurrentUserNotificationData: (state, action) => {
      state.error = null;
      state.statusCode = null;
      state.isSuccess = false;
    },
    resetCurrentUserNotification: (state, action) => {
      state.notificationData = [];
      state.isReachedEnd = false;
      state.page = 1;
      state.totalCount = null;
    },
    resetPage: (state, action) => {
      state.page = 1;
      state.totalCount = null;
      state.isReachedEnd = false;
    },
    setCurrentUserNotificationPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export default GetCurrentUserAllNotifications.reducer;
export const {
  setCurrentUserNotification,
  setLoading,
  setError,
  resetCurrentUserNotificationData,
  setReachedEnd,
  resetCurrentUserNotification,
  resetPage,
  setCurrentUserNotificationPage,
} = GetCurrentUserAllNotifications.actions;

export const getCurrentUserAllNotificationsApi =
  (pageNumber, pageSize) => async (dispatch) => {
    try {
      dispatch(resetCurrentUserNotificationData());
      dispatch(setLoading(true));
      const responce =
        await NotificationServices.GetCurrentUserAllNotifications(
          pageNumber,
          pageSize
        );
      dispatch(setCurrentUserNotification(responce.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response));
    }
  };
