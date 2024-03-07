import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken, userDetail } from "../../Constants/defaults";
import { setuserDetail } from "./LoginSlice";

const EditProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    isLoading: false,
    error: null,
    isSuccess: false,
    updateProfileData: null,
    errorCode: null,
  },
  reducers: {
    setUpdateProfileData: (state, action) => {
      state.updateProfileData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetEditProfileData: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.updateProfileData = null;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});
export default EditProfileSlice.reducer;
export const {
  setUpdateProfileData,
  setLoading,
  setError,
  resetEditProfileData,
  setErrorCode,
} = EditProfileSlice.actions;

export const editProfileApi = (data) => async (dispatch) => {
  console.log("-=-edit profile", data);
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await AuthServices.editProfile(data);
    console.log("-=-edit responce52-=-", responce);
    const userResponce = await AuthServices.getUserInfo();
    await AsyncStorage.setItem(
      userDetail,
      JSON.stringify(userResponce?.data?.Data)
    );
    console.log("-=-=-user Responce-=-", userResponce);
    dispatch(setUpdateProfileData(responce?.data));
    dispatch(setuserDetail(userResponce?.data?.Data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log("error-=62", error);
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    dispatch(setErrorCode(error.response.status));
    console.log("-=-=-edit profile error-=-=-", error.response.data);
  }
};
