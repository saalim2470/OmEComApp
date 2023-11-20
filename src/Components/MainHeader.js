import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import images from "../Constants/images";
import colors from "../Constants/colors";
import { Avatar } from "react-native-paper";
import commonStyle from "../Constants/commonStyle";

const MainHeader = ({
  leftIcon,
  middleIcon,
  rightIcon,
  middleTxt,
  leftView,
  rightTxt,
  onClickRightIcon = () => {},
  onClickLeftIcon = () => {},
}) => {
  return (
    <View style={styles.headerStyle}>
      {leftView && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Image source={images.facebookIcon} size={scale(30)} />
          <Text
            style={[
              commonStyle.headingTxt,
              { fontSize: scale(13), marginLeft: moderateScale(3) },
            ]}
          >
            Welcome to the
          </Text>
        </View>
      )}
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onClickLeftIcon();
          }}
        >
          {leftIcon}
        </TouchableOpacity>
      )}
      {middleTxt && <Text>{middleTxt}</Text>}
      {middleIcon && (
        <Image
          source={middleIcon}
          style={{
            width: scale(50),
            height: scale(50),
          }}
          resizeMode="contain"
        />
      )}
      {rightTxt && <Text>{rightTxt}</Text>}
      {rightIcon && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.storyCircle]}
          onPress={() => {
            onClickRightIcon();
          }}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerStyle: {
    // height: verticalScale(44),
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(2),
  },
  iconStyle: {
    width: scale(30),
    height: scale(30),
  },
  storyCircle: {
    width: scale(30),
    height: scale(30),
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
