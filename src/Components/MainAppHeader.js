import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import colors from "../Constants/colors";

const MainAppHeader = ({ onClickNavigate, onClickRightIcon }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerStyle]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onClickNavigate
            ? navigation.navigate(onClickNavigate)
            : navigation.goBack();
        }}
      >
        <Image
          source={images.back_Icon}
          resizeMode="contain"
          style={{ width: scale(22), height: scale(22) }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClickRightIcon();
        }}
      >
        <Text style={[styles.btnTxt, { color: colors.themeColor }]}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainAppHeader;

const styles = StyleSheet.create({
  headerStyle: {
    height: verticalScale(44),
    marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(13),
  },
});
