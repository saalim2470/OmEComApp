import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CircleOTP from "../../Components/CircleOTP";
import { StackActions, useNavigation } from "@react-navigation/native";
import CustomeButton from "../../Components/CustomeButton";
import colors from "../../Constants/colors";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordApi,
  resetPasswordSliceData,
} from "../../store/authSlices/PasswordSlice";
import TextBox from "../../Components/TextBox";
import { TextInput } from "react-native-paper";
import { checkPassword } from "../../Constants/Constant";
import CustomeAlertModal from "../../Components/CustomeAlertModal";

const Verification = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route?.params;
  const dispatch = useDispatch();
  const {
    isLoading: loading,
    responce: dataResponce,
    error: error,
  } = useSelector((state) => state.passwordSlice);
  console.log(useSelector((state) => state.passwordSlice));
  const [otpValue1, setOtpValue1] = useState("");
  const [otpValue2, setOtpValue2] = useState("");
  const [otpValue3, setOtpValue3] = useState("");
  const [otpValue4, setOtpValue4] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const handleVerify = () => {
    const verificationCode = `${otpValue1}${otpValue2}${otpValue3}${otpValue4}`;
    const resetPasswordModel = {
      email: email,
      resetCode: verificationCode,
      newPassword: password,
    };
    dispatch(resetPasswordApi(resetPasswordModel));
  };
  const handleError = (msg, fieldName) => {
    setErrors((prevState) => ({ ...prevState, [fieldName]: msg }));
  };
  const validate = () => {
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
    if (isValid) {
      handleVerify();
    }
  };
  useEffect(() => {
    if (dataResponce !== null && dataResponce?.Success) {
      setShowAlert({
        show: true,
        title: "Reset Password",
        msg: "Password reset successfully",
        type: "success",
      });
    }
  }, [dataResponce]);
  useEffect(() => {
    if (error !== null && !error?.Success) {
      setShowAlert({
        show: true,
        title: "Reset Password",
        msg: error?.ErrorMessage || "Some error occured",
        type: "error",
      });
    }
  }, [error]);

  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(resetPasswordSliceData());
    showAlert.type === "success" &&
      navigation.dispatch(
        StackActions.replace(screenName.authRoute, {
          screen: screenName.login,
        })
      );
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Verification code?</Text>
        <Text style={styles.subTxt}>
          {`Your privacy means a lot to us. Enter 4 digit code sent to you at ${email}`}
        </Text>
        <View style={commonStyle.row}>
          <CircleOTP
            childRef={input_1}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue1(value.toString());
              if (value) input_2.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_2}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue2(value.toString());
              if (value) input_3.current.focus();
              if (!value) input_1.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_3}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue3(value.toString());
              if (value) input_4.current.focus();
              if (!value) input_2.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_4}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue4(value.toString());
              if (!value) input_3.current.focus();
            }}
          />
        </View>
        <View>
          <TextBox
            label={"New Password"}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            secureTextEntry={!newPasswordVisible}
            left={<TextInput.Icon icon={"lock-outline"} tintColor="grey" />}
            right={
              <TextInput.Icon
                icon={newPasswordVisible ? "eye-outline" : "eye-off-outline"}
                tintColor="grey"
                onPress={() => {
                  setNewPasswordVisible(!newPasswordVisible);
                }}
              />
            }
            onchange={(txt) => {
              setPassword(txt);
            }}
          />
          <TextBox
            label={"Confirm Password"}
            error={errors.cPassword}
            onFocus={() => {
              handleError(null, "cPassword");
            }}
            secureTextEntry={!cPasswordVisible}
            style={{ marginTop: verticalScale(8) }}
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
            onchange={(txt) => {
              setCPassword(txt);
            }}
          />
        </View>
        <CustomeButton
          title={"Verify"}
          disabled={!password && !cPassword}
          onClick={() => {
            // handleVerify();
            validate();
          }}
        />
        <Text style={[styles.subTxt, { alignSelf: "center" }]}>
          Didn't recieve a verification code?
        </Text>
        <TouchableOpacity style={{ alignSelf: "center" }} activeOpacity={0.6}>
          <Text style={styles.resendTxt}>Resend code</Text>
        </TouchableOpacity>
      </View>
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

export default Verification;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(15),
    fontSize: scale(11),
    lineHeight: 20,
    fontFamily: "Montserrat-Light",
  },
  resendTxt: {
    color: colors.themeColor,
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(12),
  },
});
