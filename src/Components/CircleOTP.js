import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TextInput } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import colors from "../Constants/colors";

const CircleOTP = (props) => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      maxLength={1}
      value={value}
      onFocus={()=>{
        props?.onFocus()
      }}
      cursorColor={"#000000"}
      ref={props.childRef}
      onChangeText={(input) => {
        setValue(input);
        props.onChangeText(input);
      }}
      keyboardType={"numeric"}
      style={[
        styles.otpContainer,
        {
          color: "#000000",
          borderBottomColor: colors.themeColor,
          fontFamily: "Montserrat-Regular",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(60),
    height: verticalScale(50),
    fontSize: moderateScale(19),
    textAlign: "center",
    marginBottom: moderateVerticalScale(25),
    borderBottomWidth: 1,
  },
});

export default CircleOTP;
