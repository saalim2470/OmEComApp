import { createSlice } from "@reduxjs/toolkit";
import ProfileServices from "../../services/ProfileServices";

const GetUserContentSlice = createSlice({
  name: "getUSerContent",
  initialState: {
    isLoading: false,
    userContentData: [],
    error: null,
    isSuccess: false,
  },
  reducers: {
    setUserContent: (state, action) => {
      if(action.payload?.pageNumber===1){
        state.userContentData =  action.payload?.data?.Data
      }else{
        state.userContentData = [
          ...state.userContentData,
          ...action.payload?.Data,
        ];
      }
    
      state.isSuccess = action.payload?.Success;
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
      state.userContentData = [];
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
    dispatch(setUserContent({data:responce?.data,pageNumber:pageNumber}));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log(error.response.data);
  }
};
