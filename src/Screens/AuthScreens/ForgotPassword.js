import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import Header from "../../Components/Header";
import TextBox from "../../Components/TextBox";
import { TextInput } from "react-native-paper";
import CustomeButton from "../../Components/CustomeButton";
import { useNavigation } from "@react-navigation/native";
import commonStyle from "../../Constants/commonStyle";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordApi,
  resetPasswordSliceData,
  setResponce,
} from "../../store/authSlices/PasswordSlice";
import CustomeAlertModal from "../../Components/CustomeAlertModal";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    responce: dataResponce,
    error: error,
    getCodeLoading
  } = useSelector((state) => state.passwordSlice);
  const [email_mobile, setEmail_mobile] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const handleForgotPassword = () => {
    dispatch(forgotPasswordApi(email_mobile));
  };
  useEffect(() => {
    if ( dataResponce?.Success) {
      setShowAlert({
        show: true,
        title: "Reset Password",
        msg: `Verification code sent to your email/mobile ${email_mobile}`,
        type: "success",
      });
    }
    // uncomment code when sms enabled
    // navigation.navigate(screenName.verification, {
    //   email: email_mobile,
    // });
    // dispatch(resetPasswordSliceData());
  }, [dataResponce]);
  useEffect(() => {
    if (error !== null && !error?.Success) {
      setShowAlert({
        show: true,
        title: "Forgot Password",
        msg: error?.ErrorMessage || "Some error occured",
        type: "error",
      });
    }
  }, [error]);
  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(resetPasswordSliceData());
    showAlert.type === "success" &&
      navigation.navigate(screenName.verification, {
        email: email_mobile,
      });
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View
        style={[
          commonStyle.innerContainer,
          { justifyContent: "center", marginTop: verticalScale(-50) },
        ]}
      >
        <Text style={commonStyle.headingTxt}>Forgot Password?</Text>
        <Text style={styles.subTxt}>
          Please enter your registered email or mobile to reset your password.
        </Text>
        <TextBox
          keyboardType={"email-address"}
          value={email_mobile}
          left={<TextInput.Icon icon={"email-outline"} tintColor="grey" />}
          label={"Email / Mobile"}
          onchange={(value) => setEmail_mobile(value)}
        />
        <CustomeButton
          title={"Recover Password"}
          disabled={!email_mobile}
          isLoading={getCodeLoading}
          onClick={() => {
            handleForgotPassword();
          }}
        />
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

export default ForgotPassword;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(10),
    fontSize: scale(11),
    fontFamily: "Montserrat-Light",
  },
});
