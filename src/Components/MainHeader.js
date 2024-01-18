import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import images from "../Constants/images";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import screenName from "../Constants/screenName";
import { DrawerActions } from "@react-navigation/native";

const MainHeader = ({ navigation }) => {
  return (
    <View style={styles.headerStyle}>
      <Pressable
        onPress={() => {
          // navigation.openDrawer();
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <Feather name="menu" size={scale(30)} color="black" />
      </Pressable>
      <Image
        source={images.omLogo}
        style={{
          width: scale(50),
          height: scale(50),
        }}
        resizeMode="contain"
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.storyCircle]}
        onPress={() => {
          navigation.navigate(screenName.notification);
        }}
      >
        <Ionicons name="notifications-outline" size={scale(30)} color="black" />
      </TouchableOpacity>
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
