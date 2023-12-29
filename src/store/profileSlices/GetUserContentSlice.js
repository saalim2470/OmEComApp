import { createSlice } from "@reduxjs/toolkit";
import ProfileServices from "../../services/ProfileServices";

const GetUserContentSlice = createSlice({
  name: "getUSerContent",
  initialState: {
    isLoading: false,
    userContentData: null,
    error: null,
    isSuccess: false,
  },
  reducers: {
    setUserContent: (state, action) => {
        state.userContentData = action.payload?.data

      state.isSuccess = action.payload?.data?.Success;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUserAdContent: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.userContentData = null;
    },
  },
});
export default GetUserContentSlice.reducer;
export const { setUserContent, setLoading, setError, resetUserAdContent } =
  GetUserContentSlice.actions;

export const getUserContentApi = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await ProfileServices.getUserAdContent(
      pageNumber,
      pageSize
    );
    dispatch(setUserContent({ data: responce?.data, pageNumber: pageNumber }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
