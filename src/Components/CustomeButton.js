import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import { ActivityIndicator } from "react-native";

const CustomeButton = ({
  title,
  onClick = () => {},
  style = {},
  txtStyle = {},
  disabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { ...style }]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={() => {
        onClick();
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text style={{ ...styles.txt, ...txtStyle }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomeButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(15),
    backgroundColor: colors.themeColor,
  },
  txt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(12),
    color: "#FFFFFF",
  },
});
