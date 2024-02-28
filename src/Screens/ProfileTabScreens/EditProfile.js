import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { startTransition, useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import TextBox from "../../Components/TextBox";
import { Avatar, HelperText, TextInput } from "react-native-paper";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CustomeButton from "../../Components/CustomeButton";
import { Image } from "react-native";
import colors from "../../Constants/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getStateData } from "../../store/contrySlices/GetStateSlice";
import { getCityData } from "../../store/contrySlices/GetCitySlice";
import DropDownPicker from "react-native-dropdown-picker";
import { checkPassword, validateEmail } from "../../Constants/Constant";
import { Entypo } from "@expo/vector-icons";
import BottomSheetCustome from "../../Components/BottomSheet/BottomSheetCustome";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import {
  editProfileApi,
  resetEditProfileData,
  setError,
} from "../../store/authSlices/EditProfileSlice";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import Loading from "../../Components/Loading";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formData = new FormData();
  const countryDataRes = useSelector((state) => state.getCountry.countryData);
  const stateDataRes = useSelector((state) => state.getState.stateData);
  const stateDataResLoading = useSelector((state) => state.getState.isLoading);
  const cityDataRes = useSelector((state) => state.getCity.cityData);
  const cityDataResLoading = useSelector((state) => state.getCity.isLoading);
  const editProfileLoading = useSelector(
    (state) => state.editProfile.isLoading
  );
  const editProfileDataRes = useSelector(
    (state) => state.editProfile.updateProfileData
  );
  const editProfileError = useSelector((state) => state.editProfile.error);
  const userDetail = useSelector((state) => state.login?.userDetail);

  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [errors, setErrors] = useState({});
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [openCountryPicker, setOpenCountryPicker] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState(null);
  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState(null);
  const [openCityPicker, setOpenCityPicker] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState(null);
  const [openCameraMenu, setOpenCameraMenu] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  console.log("=-=-user detail-=-=-", userDetail);
  useEffect(() => {
    dispatch(getStateData(userDetail?.stateId, 1, 50));
    dispatch(getCityData(userDetail?.cityId, 1, 50));
    setFirstName(userDetail?.firstName);
    setLastName(userDetail?.lastName);
    setEmail(userDetail?.email);
    setMobileNo(userDetail?.phoneNumber);
    setProfileImage(
      userDetail?.profilePicture !== null
        ? `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`
        : null
    );
  }, [userDetail]);
  console.log(profileImage);

  useEffect(() => {
    if (countryDataRes != null && countryDataRes?.Success) {
      setCountryData(countryDataRes?.Data?.items);
      setCountry(userDetail?.countryId);
    }
    if (stateDataRes != null && stateDataRes?.Success) {
      setStateData(stateDataRes?.Data?.items);
      setState(userDetail?.stateId);
    }
    if (cityDataRes != null && cityDataRes?.Success) {
      setCityData(cityDataRes?.Data?.items);
      setCity(userDetail?.cityId);
    }
  }, [countryDataRes, stateDataRes, cityDataRes]);

  useEffect(() => {
    if (editProfileError != null && !editProfileError?.success) {
      showModal(
        "Error",
        editProfileError?.ErrorMessage || "Some error occured",
        "error"
      );
    }
  }, [editProfileError]);
  useEffect(() => {
    if (editProfileDataRes?.Success) {
      showModal("Success", "Profile update successfully", "success");
    }
  }, [editProfileDataRes]);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);
  const showModal = (title, msg, type) => {
    setShowAlert({
      show: true,
      title: title,
      msg: msg,
      type: type,
    });
  };
  const onClickBtn = () => {
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("mobileNumber", mobileNo);
    formData.append("email", email);
    formData.append("cityId", city);
    formData.append("stateId", state);
    formData.append("countryId", country);
    formData.append("username", email);
    formData.append("roleId", 0);
    const uriParts = profileImage.split(".");
    const fileType = uriParts[uriParts.length - 1];
    formData.append("ProfilePicture", {
      uri: profileImage,
      name: `image_.${fileType}`,
      type: `image/${fileType}`,
    });
    dispatch(editProfileApi(formData));
  };
  const validate = () => {
    let isValid = true;
    if (!firstName.trim()) {
      handleError("Enter First Name", "fName");
      isValid = false;
    }
    if (!lastName.trim()) {
      handleError("Enter Last Name", "lName");
      isValid = false;
    }
    if (!email.trim()) {
      handleError("Enter Email Name", "email");
      isValid = false;
    } else if (validateEmail(email)) {
      isValid = true;
    } else {
      handleError("Enter Valid Email", "email");
      isValid = false;
    }
    if (!mobileNo.trim()) {
      handleError("Enter Mobile No.", "mobileNo");
      isValid = false;
    } else if (mobileNo.length != 10) {
      handleError("Enter 10 digit Mobile No", "mobileNo");
      isValid = false;
    }
    if (!country) {
      handleError("Select Country", "country");
      isValid = false;
    }
    if (!state) {
      handleError("Select State", "state");
      isValid = false;
    }
    if (!city) {
      handleError("Select City", "city");
      isValid = false;
    }
    if (isValid) {
      onClickBtn();
    }
  };
  const handleError = (msg, fieldName) => {
    setErrors((prevState) => ({ ...prevState, [fieldName]: msg }));
  };
  const checkLibrarayPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (currentStatus !== "granted") {
      requestPermission();
    } else if (currentStatus == "granted") {
      openImagePicker();
    }
  };
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const checkCameraPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getCameraPermissionsAsync();
    if (currentStatus !== "granted") {
      requestCameraPermission();
    } else if (currentStatus == "granted") {
      openCamera();
    }
  };
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const removeImage = () => {
    setProfileImage("");
  };
  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(setError(null));
    dispatch(resetEditProfileData());
    showAlert.type == "success" && navigation.goBack();
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={commonStyle.innerContainer}
      >
        <Text style={commonStyle.headingTxt}>Edit Profile</Text>
        {stateDataResLoading || cityDataResLoading ? (
          <Loading />
        ) : (
          <KeyboardAvoidingView>
            <View style={styles.profileImgView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.profileImgBtn}
                onPress={() => {
                  !profileImage ? setOpenCameraMenu(true) : removeImage();
                }}
              >
                {!profileImage ? (
                  <Entypo name="camera" size={scale(13)} color="white" />
                ) : (
                  <FontAwesome name="remove" size={scale(13)} color="white" />
                )}
              </TouchableOpacity>
              {profileImage !== null ? (
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  style={styles.profileImg}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1sE47wDfhJWPfb_C6ceXAImxmTZe1DE_CpeZYtgg_Vw&s",
                  }}
                  style={styles.profileImg}
                />
              )}
            </View>
            <TextBox
              label={"First Name"}
              value={firstName}
              containerStyle={{ marginBottom: verticalScale(8) }}
              error={errors.fName}
              onFocus={() => {
                handleError(null, "fName");
              }}
              left={
                <TextInput.Icon icon={"account-outline"} tintColor="grey" />
              }
              onchange={(value) => {
                setFirstName(value);
              }}
            />
            <TextBox
              label={"Last Name"}
              value={lastName}
              error={errors.lName}
              onFocus={() => {
                handleError(null, "lName");
              }}
              containerStyle={{ marginBottom: verticalScale(8) }}
              left={
                <TextInput.Icon icon={"account-outline"} tintColor="grey" />
              }
              onchange={(value) => {
                setLastName(value);
              }}
            />
            <TextBox
              label={"Email"}
              value={email}
              onFocus={() => {
                handleError(null, "email");
              }}
              error={errors.email}
              keyboardType={"email-address"}
              containerStyle={{ marginBottom: verticalScale(8) }}
              left={<TextInput.Icon icon={"email-outline"} tintColor="grey" />}
              onchange={(value) => {
                setEmail(value);
              }}
            />
            <TextBox
              label={"Mobile number"}
              value={mobileNo}
              error={errors.mobileNo}
              onFocus={() => {
                handleError(null, "mobileNo");
              }}
              keyboardType={"phone-pad"}
              containerStyle={{ marginBottom: verticalScale(8) }}
              left={
                <TextInput.Icon
                  icon={"phone-hangup-outline"}
                  tintColor="grey"
                />
              }
              onchange={(value) => {
                setMobileNo(value);
              }}
            />
            <DropDownPicker
              schema={{
                label: "name",
                value: "id",
              }}
              labelStyle={styles.ddTxt}
              textStyle={styles.ddTxt}
              placeholder="Select Country"
              open={openCountryPicker}
              value={country}
              items={countryData}
              setOpen={setOpenCountryPicker}
              setValue={setCountry}
              setItems={setCountryData}
              style={[
                styles.ddStyle,
                { borderColor: errors.country ? "red" : "#cacaca" },
              ]}
              zIndex={3000}
              zIndexInverse={1000}
              onSelectItem={(item) => {
                handleError(null, "country");
                dispatch(getStateData(item.id, 1, 10));
              }}
            />
            {errors.country ? (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Montserrat-Regular",
                  fontSize: scale(11),
                }}
              >
                {errors.country}
              </Text>
            ) : null}
            <DropDownPicker
              loading={stateDataResLoading}
              schema={{
                label: "name",
                value: "id",
              }}
              labelStyle={styles.ddTxt}
              textStyle={styles.ddTxt}
              placeholder="Select an State"
              open={openStatePicker}
              value={state}
              items={stateData}
              setOpen={setOpenStatePicker}
              setValue={setState}
              setItems={setStateData}
              style={[
                styles.ddStyle,
                { borderColor: errors.state ? "red" : "#cacaca" },
              ]}
              zIndex={2000}
              // zIndexInverse={2000}
              onSelectItem={(item) => {
                handleError(null, "state");
                dispatch(getCityData(item.id, 1, 10));
              }}
            />
            {errors.state ? (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Montserrat-Regular",
                  fontSize: scale(11),
                }}
              >
                {errors.state}
              </Text>
            ) : null}
            <DropDownPicker
              loading={cityDataResLoading}
              labelStyle={styles.ddTxt}
              textStyle={styles.ddTxt}
              schema={{
                label: "name",
                value: "id",
              }}
              placeholder="Select an City"
              open={openCityPicker}
              value={city}
              items={cityData}
              setOpen={setOpenCityPicker}
              setValue={setCity}
              setItems={setCityData}
              style={[
                styles.ddStyle,
                { borderColor: errors.city ? "red" : "#cacaca" },
              ]}
              zIndex={1000}
              zIndexInverse={3000}
              onSelectItem={(item) => {
                handleError(null, "city");
              }}
            />
            {errors.city ? (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Montserrat-Regular",
                  fontSize: scale(11),
                }}
              >
                {errors.city}
              </Text>
            ) : null}
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      {stateDataResLoading || cityDataResLoading ? null : (
        <CustomeButton
          title={"Edit Profile"}
          isLoading={editProfileLoading}
          style={{ marginHorizontal: moderateScale(15) }}
          onClick={() => {
            validate();
          }}
        />
      )}
      <BottomSheetCustome
        isVisible={openCameraMenu}
        height={verticalScale(200)}
        onBackDropPress={() => {
          setOpenCameraMenu(false);
        }}
        children={
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.optionBtn}
              onPress={() => {
                checkLibrarayPermission();
                setOpenCameraMenu(false);
              }}
            >
              <MaterialIcons
                name="photo-album"
                size={scale(17)}
                color={colors.themeColor}
              />
              <Text style={styles.optionTxt}>select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.optionBtn}
              onPress={() => {
                checkCameraPermission();
                setOpenCameraMenu(false);
              }}
            >
              <Entypo
                name="camera"
                size={scale(17)}
                color={colors.themeColor}
              />
              <Text style={styles.optionTxt}>Open camera</Text>
            </TouchableOpacity>
          </>
        }
      />
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  bottomLineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  lineStyle: {
    borderWidth: 0.2,
    width: scale(110),
    backgroundColor: "#cacaca",
    borderColor: "#cacaca",
  },
  commonTxt: {
    fontFamily: "Montserrat-Regular",
    color: "#cacaca",
  },
  loginIconBtnView: {
    // flex: 1,
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateVerticalScale(6),
    borderRadius: moderateScale(3),
  },
  loginBtnIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: moderateScale(5),
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomBox: {
    position: "absolute",
    bottom: moderateVerticalScale(40),
    marginHorizontal: moderateScale(20),
    width: "100%",
  },
  bottomTxt: {
    alignSelf: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(11),
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    color: "#cacaca",
  },
  ddStyle: {
    borderWidth: 1,
    height: verticalScale(40),
    borderColor: "#cacaca",
    borderRadius: scale(3),
    marginBottom: verticalScale(10),
    // zIndex: 999,
  },
  ddContainer: {
    borderWidth: 1,
    // height: verticalScale(100),
    // position: "absolute",
    // width: "100%",
    // top: verticalScale(50),
    // zIndex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#cacaca",
  },
  ddContainerRow: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(7),
  },
  ddTxt: {
    fontFamily: "Montserrat-Regular",
  },
  profileImgView: {
    width: scale(80),
    height: scale(80),
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: verticalScale(8),
  },
  profileImgBtn: {
    width: scale(25),
    height: scale(25),
    borderRadius: 100,
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.themeColor,
    zIndex: 999,
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  optionBtn: {
    padding: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  optionTxt: {
    marginLeft: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: scale(15),
  },
});
