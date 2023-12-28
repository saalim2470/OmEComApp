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
      state.isLoading=false
      state.updateProfileData=null
    },
  },
});
export default EditProfileSlice.reducer;
export const { setUpdateProfileData, setLoading, setError,resetEditProfileData } =
  EditProfileSlice.actions;

export const editProfileApi = (data) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading(true));
    const responce = await AuthServices.editProfile(data);
    const userResponce = await AuthServices.getUserInfo();
    await AsyncStorage.setItem(
      userDetail,
      JSON.stringify(userResponce?.data?.Data)
    );
    dispatch(setUpdateProfileData(responce?.data));
    dispatch(setuserDetail(userResponce?.data?.Data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data));
    console.log("-=-=-edit profile error-=-=-", error.response.data);
  }
};
