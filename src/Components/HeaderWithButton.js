import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import commonStyle from "../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../Constants/colors";

const HeaderWithButton = ({ title, onClick = () => {}, style }) => {
  return (
    <View style={[styles.headingWrapper, { ...style }]}>
      <Text style={commonStyle.smallHeading}>{title}</Text>
      <TouchableOpacity
        style={styles.headingBtn}
        activeOpacity={0.6}
        onPress={() => {
          onClick();
        }}
      >
        <Text style={styles.headingTxt}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithButton;

const styles = StyleSheet.create({
  headingWrapper: {
    //   borderWidth: 1,
    marginHorizontal: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingBtn: {
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: colors.themeColor,
    paddingHorizontal: moderateScale(8),
  },
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(10),
    color: "#FFFFFF",
  },
});
