import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { TextInput } from "react-native-paper";
import TextBox from "../../Components/TextBox";
import CustomeButton from "../../Components/CustomeButton";
import screenName from "../../Constants/screenName";
import colors from "../../Constants/colors";
import images from "../../Constants/images";
import commonStyle from "../../Constants/commonStyle";
import { KeyboardAvoidingView } from "react-native";
import { CommonActions, StackActions } from "@react-navigation/native";
import { emailValidate, passwordValidate } from "../../Constants/functions";
import CustomeSnackbar from "../../Components/CustomeSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser } from "../../store/authSlices/LoginSlice";
import { useEffect } from "react";
import { getCountryData } from "../../store/contrySlices/GetCountrySlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginSuccess = useSelector((state) => state.login.isSuccess);
  const loginLoading = useSelector((state) => state.login.isLoading);
  const loginError = useSelector((state) => state.login.error);
  const logindata = useSelector((state) => state.login);
  console.log("-=-=-user-=-=", logindata);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showError, setShowError] = useState({ isError: false, msg: null });
  useEffect(() => {
    if (loginSuccess) {
      // navigation.dispatch(StackActions.replace(screenName.drawerNavigation));
    }
  }, [loginSuccess]);
  useEffect(() => {
    if (loginError != null && !loginError?.Success) {
      const errorData = JSON.parse(loginError?.ErrorMessage);
      setShowError({ isError: true, msg: errorData?.title });
    }
  }, [loginError]);

  const onClickLogin = () => {
    if (email != "" && password != "") {
      dispatch(
        getLoginUser({
          username: email,
          password: password,
        })
      );
    } else {
      setShowError({ isError: true, msg: "Enter email or password" });
    }
  };
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
            fontSize: scale(10),
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.8 }}>
        <Image
          source={images.loginImg2}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      </View>
      <View style={commonStyle.innerContainer}>
        <Text style={[styles.txt]}>Login</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextBox
            placeholderTextColor={"#cacaca"}
            containerStyle={{ marginBottom: verticalScale(8) }}
            error={emailError}
            errorMsg={"Email address is invalid!"}
            value={email}
            label={"Email"}
            left={<TextInput.Icon icon={"email-outline"} tintColor="grey" />}
            onchange={(txt) => {
              setEmail(txt);
              // setEmailError(!emailValidate(txt));
            }}
          />
          <TextBox
            label={"Password"}
            secureTextEntry={!passwordVisible}
            error={passwordError}
            errorMsg={"password must be at least 8 characters"}
            value={password}
            onchange={(txt) => {
              setPassword(txt);
              // setPasswordError(!passwordValidate(txt));
            }}
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
          />
        </KeyboardAvoidingView>
        <View style={commonStyle.row}>
          <TouchableOpacity
            style={{
              marginTop: moderateScale(3),
            }}
            onPress={() => {
              navigation.navigate(screenName.mPin);
            }}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.commonTxt,
                {
                  fontFamily: "Montserrat-Medium",
                  fontSize: scale(12),
                },
              ]}
            >
              Login with Mpin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginTop: moderateScale(3),
            }}
            onPress={() => {
              navigation.navigate(screenName.forgotPassword);
            }}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.commonTxt,
                {
                  fontFamily: "Montserrat-Medium",
                  fontSize: scale(12),
                },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <CustomeButton
          title={"Login"}
          isLoading={loginLoading}
          disabled={loginLoading}
          onClick={() => {
            onClickLogin();
          }}
        />
        <View style={styles.bottomLineView}>
          <View style={styles.lineStyle}></View>
          <Text style={styles.commonTxt}>Or With</Text>
          <View style={styles.lineStyle}></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: moderateScale(12),
          }}
        >
          {loginBtns(images.facebookIcon, "Facebook", "#ebf3ff", "#8e9dae")}
          {loginBtns(images.googleIcon, "Google", "#fbf1f0")}
          {loginBtns(images.appleIcon, "Apple", "#f2f2f2")}
        </View>

        <Text
          style={[
            styles.commonTxt,
            {
              alignSelf: "center",
              marginTop: moderateScale(20),
            },
          ]}
        >
          Don't have an account?
          <Text
            style={{
              color: colors.themeColor,
              fontFamily: "Montserrat-Medium",
            }}
            onPress={() => {
              dispatch(getCountryData(1, 10));
              navigation.navigate(screenName.createAccount);
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
      <CustomeSnackbar
        data={showError}
        onClickDismiss={() => setShowError({ isError: false, msg: null })}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loginView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  txt: {
    fontSize: scale(16),
    fontFamily: "Montserrat-Bold",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(15),
    backgroundColor: "#7c549b",
  },
  bottomLineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  loginIconBtnView: {
    // flex: 1,
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(6),
    borderRadius: 3,
  },
  loginBtnIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: moderateScale(5),
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
});
