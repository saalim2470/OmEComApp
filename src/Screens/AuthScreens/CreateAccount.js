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
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import TextBox from "../../Components/TextBox";
import { HelperText, TextInput } from "react-native-paper";
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
import screenName from "../../Constants/screenName";
import images from "../../Constants/images";
import DropDown from "../../Components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getStateData } from "../../store/contrySlices/GetStateSlice";
import { getCityData } from "../../store/contrySlices/GetCitySlice";
import DropDownPicker from "react-native-dropdown-picker";
import { createAccountApi } from "../../store/authSlices/CreateAccountSlice";
import { checkPassword, validateEmail } from "../../Constants/Constant";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const countryDataRes = useSelector((state) => state.getCountry.countryData);
  const stateDataRes = useSelector((state) => state.getState.stateData);
  const stateDataResLoading = useSelector((state) => state.getState.isLoading);
  const cityDataRes = useSelector((state) => state.getCity.cityData);
  const cityDataResLoading = useSelector((state) => state.getCity.isLoading);
  const authLoading = useSelector((state) => state.createAccount.isLoading);
  const authSuccess = useSelector((state) => state.createAccount.isLoggedIn);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
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
  const loginBtns = (icon, name, bkColor, txtColor) => {
    return (
      <TouchableOpacity
        style={[styles.loginIconBtnView, { backgroundColor: bkColor }]}
        activeOpacity={0.7}
      >
        <Image source={icon} style={styles.loginBtnIcon} />
        <Text
          style={{
            color: txtColor,
            fontFamily: "Montserrat-Regular",
            fontSize: moderateScale(11),
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  const onClickBtn = () => {
    const data = {
      username: email,
      firstname: firstName,
      lastname: lastName,
      mobileNumber: mobileNo,
      email: email,
      password: password,
      cityId: city,
      stateId: state,
      countryId: country,
      roleId: 0,
    };
    dispatch(createAccountApi(data));
  };
  useEffect(() => {
    if (countryDataRes != null && countryDataRes?.Success) {
      setCountryData(countryDataRes?.Data);
    }
    if (stateDataRes != null && stateDataRes?.Success) {
      setStateData(stateDataRes?.Data);
    }
    if (cityDataRes != null && cityDataRes?.Success) {
      setCityData(cityDataRes?.Data);
    }
  }, [countryDataRes, stateDataRes, cityDataRes]);
  useEffect(() => {
    if (authSuccess != false && authSuccess) {
      console.log("succes");
      navigation.dispatch(
        StackActions.replace(screenName.drawerNavigation, {
          screen: screenName.homeScreenIcons,
        })
      );
    }
  }, [authSuccess]);

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
    if (!password.trim()) {
      handleError("Enter password", "password");
      isValid = false;
    } else if (checkPassword(password)) {
      isValid = true;
    } else {
      handleError(
        "Enter 8 letter password, with at least a symbol, upper and lower case letters and a number",
        "password"
      );
      isValid = false;
    }
    if (!cPassword.trim()) {
      handleError("Enter Confirm password", "cPassword");
      isValid = false;
    } else if (password != cPassword) {
      handleError("Password and confirm password does not match", "cPassword");
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
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={commonStyle.innerContainer}
      >
        <Text style={commonStyle.headingTxt}>Create an Account</Text>
        <KeyboardAvoidingView>
          <TextBox
            label={"First Name"}
            containerStyle={{ marginBottom: verticalScale(8) }}
            error={errors.fName}
            onFocus={() => {
              handleError(null, "fName");
            }}
            left={<TextInput.Icon icon={"account-outline"} tintColor="grey" />}
            onchange={(value) => {
              setFirstName(value);
            }}
          />
          <TextBox
            label={"Last Name"}
            error={errors.lName}
            onFocus={() => {
              handleError(null, "lName");
            }}
            containerStyle={{ marginBottom: verticalScale(8) }}
            left={<TextInput.Icon icon={"account-outline"} tintColor="grey" />}
            onchange={(value) => {
              setLastName(value);
            }}
          />
          <TextBox
            label={"Email"}
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
            error={errors.mobileNo}
            onFocus={() => {
              handleError(null, "mobileNo");
            }}
            keyboardType={"phone-pad"}
            containerStyle={{ marginBottom: verticalScale(8) }}
            left={
              <TextInput.Icon icon={"phone-hangup-outline"} tintColor="grey" />
            }
            onchange={(value) => {
              setMobileNo(value);
            }}
          />
          <TextBox
            label={"Password"}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            containerStyle={{ marginBottom: verticalScale(8) }}
            secureTextEntry={!passwordVisible}
            left={<TextInput.Icon icon={"lock-outline"} tintColor="grey" />}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-outline" : "eye-off-outline"}
                tintColor="grey"
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                }}
              />
            }
            onchange={(value) => {
              setPassword(value);
            }}
          />
          <TextBox
            label={"Confirm password"}
            error={errors.cPassword}
            onFocus={() => {
              handleError(null, "cPassword");
            }}
            containerStyle={{ marginBottom: verticalScale(8) }}
            secureTextEntry={!cPasswordVisible}
            left={<TextInput.Icon icon={"lock-outline"} tintColor="grey" />}
            right={
              <TextInput.Icon
                icon={cPasswordVisible ? "eye-outline" : "eye-off-outline"}
                tintColor="grey"
                onPress={() => {
                  setCPasswordVisible(!cPasswordVisible);
                }}
              />
            }
            onchange={(value) => {
              setCPassword(value);
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
            zIndexInverse={2000}
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
          <CustomeButton
            title={"Sign Up"}
            isLoading={authLoading}
            style={{ marginTop: moderateVerticalScale(40) }}
            onClick={() => {
              // navigation.navigate(screenName.verification);
              // onClickBtn();
              validate();
            }}
          />
        </KeyboardAvoidingView>
        {/* <View
          style={[
            styles.bottomBox,
            { display: keyboardStatus ? "none" : null },
          ]}
        >
          <View style={styles.bottomLineView}>
            <View style={styles.lineStyle}></View>
            <Text style={styles.commonTxt}>Or With</Text>
            <View style={styles.lineStyle}></View>
          </View>
          <View
            style={[
              styles.flexRow,
              {
                marginVertical: moderateVerticalScale(12),
              },
            ]}
          >
            {loginBtns(images.facebookIcon, "Facebook", "#ebf3ff", "#8e9dae")}
            {loginBtns(images.googleIcon, "Google", "#fbf1f0")}
            {loginBtns(images.appleIcon, "Apple", "#f2f2f2")}
          </View>
          <Text style={styles.bottomTxt}>
            By registering you agree to{" "}
            <Text
              style={{
                color: colors.themeColor,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Terms & Conditions{" "}
            </Text>
            and{" "}
            <Text
              style={{
                color: colors.themeColor,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Privacy Policy{" "}
            </Text>
            of the OM
          </Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;

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
});
