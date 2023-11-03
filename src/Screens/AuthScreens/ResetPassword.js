import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import Header from "../../Components/Header";
import commonStyle from "../../Constants/commonStyle";
import TextBox from "../../Components/TextBox";
import { TextInput } from "react-native-paper";
import CustomeButton from "../../Components/CustomeButton";

const ResetPassword = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Reset Password</Text>
        <Text style={styles.subTxt}>
          Please enter your new password and confirm the password
        </Text>
        <KeyboardAvoidingView>
          <TextBox
            label={"New Password"}
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
          <CustomeButton title={"Update"} onClick={() => {}} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(10),
    fontSize: scale(11),
    fontFamily: "Montserrat-Light",
  },
});
