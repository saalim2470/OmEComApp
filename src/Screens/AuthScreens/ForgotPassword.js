import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
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

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Forgot Password?</Text>
        <Text style={styles.subTxt}>
          Please enter your registered email or mobile to reset your password.
        </Text>
        <TextBox
          keyboardType={"email-address"}
          left={<TextInput.Icon icon={"email-outline"} tintColor="grey" />}
          label={"Email / mobile"}
        />
        <CustomeButton
          title={"Recover Password"}
          onClick={() => {
            navigation.navigate(screenName.checkEmail);
          }}
        />
      </View>
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
