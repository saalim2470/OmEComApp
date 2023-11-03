import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import TextBox from "../../Components/TextBox";
import { TextInput } from "react-native-paper";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CustomeButton from "../../Components/CustomeButton";
import { Image } from "react-native";
import colors from "../../Constants/colors";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import images from "../../Constants/images";
import DropDown from "../../Components/DropDown";

const CreateAccount = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const cityData = [
    {
      id: 1,
      value: "Surat",
    },
    {
      id: 2,
      value: "Ahmedabad",
    },
    {
      id: 3,
      value: "Vadodara",
    },
  ];
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
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Create an Account</Text>
        <KeyboardAvoidingView>
          <TextBox
            label={"Full name"}
            style={{ marginBottom: moderateVerticalScale(10) }}
            left={<TextInput.Icon icon={"account-outline"} tintColor="grey" />}
            onchange={(value) => {
              setFullName(value);
            }}
          />
          <TextBox
            label={"Email"}
            style={{ marginBottom: moderateVerticalScale(10) }}
            left={<TextInput.Icon icon={"email-outline"} tintColor="grey" />}
            onchange={(value) => {
              setEmail(value);
            }}
          />
          <TextBox
            label={"Mobile number"}
            style={{ marginBottom: moderateVerticalScale(10) }}
            left={
              <TextInput.Icon icon={"phone-hangup-outline"} tintColor="grey" />
            }
            onchange={(value) => {
              setMobileNo(value);
            }}
          />
          <TextBox
            label={"Password"}
            style={{ marginBottom: moderateVerticalScale(10) }}
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
            style={{ marginBottom: moderateVerticalScale(10) }}
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
          <DropDown
            dropDownData={cityData}
            selectedColor={colors.themeColor}
            placeholder={"Select City"}
            selectedTxtColor={"#FFFFFF"}
            dropDownInputStyle={styles.ddStyle}
            dropDownContainer={styles.ddContainer}
            containerRow={styles.ddContainerRow}
            dropDownInputTxt={styles.ddTxt}
            dropDownContainerTxt={styles.ddTxt}
          />
          <CustomeButton
            title={"Sign Up"}
            style={{ marginTop: moderateVerticalScale(40) }}
            onClick={() => {
              navigation.navigate(screenName.verification);
            }}
          />
        </KeyboardAvoidingView>
        <View
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
        </View>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    height: verticalScale(40),
    borderColor: "#cacaca",
    borderRadius: scale(3),
    paddingLeft: moderateScale(15),
    marginTop: verticalScale(10),
  },
  ddContainer: {
    borderWidth: 1,
    height: verticalScale(100),
    position: "absolute",
    width: "100%",
    top: verticalScale(50),
    zIndex: 1,
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
