import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar } from "react-native-paper";
import images from "../../Constants/images";
import commonStyle from "../../Constants/commonStyle";

const PostHeader = ({
  leftIcon,
  middleIcon,
  rightIcon,
  middleTxt,
  leftView,
  rightTxt,
  leftTxt,
  onClickRightIcon = () => {},
  onClickLeftIcon = () => {},
  onClickProfile = () => {},
}) => {
  return (
    <View style={styles.headerStyle}>
      {leftView && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onClickProfile();
            }}
          >
            <Avatar.Image source={{ uri: leftView }} size={scale(30)} />
          </TouchableOpacity>
          <Text
            style={[
              commonStyle.headingTxt,
              { fontSize: scale(13), marginLeft: moderateScale(7) },
            ]}
          >
            {leftTxt}
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
          <Image source={leftIcon} style={styles.iconStyle} />
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
        // <TouchableOpacity
        //   activeOpacity={0.7}
        //   onPress={() => {
        //     onClickRightIcon();
        //   }}
        // >
        //   <Image source={rightIcon} style={styles.iconStyle} />
        // </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={[styles.storyCircle]}>
          <Image source={images.profileIcon} style={styles.img} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  headerStyle: {
    height: verticalScale(44),
    marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    width: scale(25),
    height: scale(25),
  },
  storyCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: 100,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
