import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import commonStyle from "../Constants/commonStyle";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerStyle]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={images.back_Icon}
          resizeMode="contain"
          style={{ width: scale(22), height: scale(22) }}
        />
      </TouchableOpacity>
      <Text style={commonStyle.headingTxt}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    height: verticalScale(44),
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
  },
});
