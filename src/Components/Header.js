import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";

const Header = ({ onClickNavigate, isCloseIcon }) => {
  const navigation = useNavigation();
  return (
    <View
      style={[styles.headerStyle, isCloseIcon && { alignItems: "flex-end" }]}
    >
      {!isCloseIcon ? (
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
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.replace(screenName.resetPassword);
          }}
        >
          <Image
            source={images.close_Icon}
            resizeMode="contain"
            style={{ width: scale(22), height: scale(22) }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    height: verticalScale(44),
    marginTop: verticalScale(30),
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
  },
});
