import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { TextInput } from "react-native-paper";
import TextBox from "../../Components/TextBox";
import CustomeButton from "../../Components/CustomeButton";
import screenName from "../../Constants/screenName";
import colors from "../../Constants/colors";
import images from "../../Constants/images";
import commonStyle from "../../Constants/commonStyle";
import { KeyboardAvoidingView } from "react-native";
import CustomeSnackbar from "../../Components/CustomeSnackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginSlice,
  getLoginUser,
  setError,
} from "../../store/authSlices/LoginSlice";
import { useEffect } from "react";
import { getCountryData } from "../../store/contrySlices/GetCountrySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUSH_TOKEN } from "../../Constants/Constant";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { setExpoPushToken } from "../../store/StoreDataSlice";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import useErrorHook from "../../CustomeHooks/useErrorHook";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Please allow omsarvatra notification permission!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const expoPushToken = useSelector((state) => state.storeData.expoPushToken);
  const loginSuccess = useSelector((state) => state.login.isSuccess);
  const loginLoading = useSelector((state) => state.login.isLoading);
  const loginError = useSelector((state) => state.login.error);
  const loginErrorCode = useSelector((state) => state.login.errorCode);
  const logindata = useSelector((state) => state.login);
  console.log(logindata);
  // const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [expoDeviceToken, setExpoDeviceToken] = useState();
  const [showError, setShowError] = useState({ isError: false, msg: null });
  const { apiShowError, setApiShowError } = useErrorHook(
    loginError,
    loginErrorCode
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // setExpoPushToken(token);
      dispatch(setExpoPushToken(token));
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("-=-receive-=-", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("-=-responce-=-", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const getNotificationPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Please allow omsarvatra notification permission!");
      return;
    }
  };
  // useEffect(() => {
  //   if (loginSuccess) {
  //     // navigation.dispatch(StackActions.replace(screenName.drawerNavigation));
  //     // setEmail("");
  //     // setPassword("");
  //   }
  // }, [loginSuccess]);

  const onClickLogin = () => {
    getNotificationPermission();
    if (email != "" && password != "") {
      dispatch(
        getLoginUser({
          username: email,
          password: password,
          expoPushToken: expoPushToken,
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
    <SafeAreaView style={commonStyle.container}>
      {/* <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      > */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ height: verticalScale(300) }}>
          <Image
            source={images.omLogo}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View style={commonStyle.innerContainer}>
          <Text style={[styles.txt]}>Login</Text>
          <View>
            <TextBox
              // placeholderTextColor={"#cacaca"}
              containerStyle={{
                marginBottom: verticalScale(8),
              }}
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
          </View>
          <View style={commonStyle.row}>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
                    // fontFamily: "Montserrat-Medium",
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
          {/* <View style={styles.bottomLineView}>
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
          </View> */}

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
                dispatch(getCountryData());
                navigation.navigate(screenName.createAccount);
              }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View>
        <CustomeSnackbar
          data={showError}
          onClickDismiss={() => {
            setShowError({ isError: false, msg: null });
            dispatch(setError(null));
          }}
        />
        </ScrollView>
      {/* </KeyboardAwareScrollView> */}
      <CustomeAlertModal
        isVisible={apiShowError.show}
        title={apiShowError.title}
        msg={apiShowError.msg}
        type={apiShowError.type}
        onClickBtn={() => {
          dispatch(clearLoginSlice());
          setApiShowError({
            ...apiShowError,
            show: false,
          });
        }}
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
    // color: "#cacaca",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
