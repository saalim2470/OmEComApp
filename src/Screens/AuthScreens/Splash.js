import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import colors from "../../Constants/colors";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(screenName.introduction);
    }, 1500);
  });

  return (
    <View
      style={[
        commonStyle.container,
        {
          backgroundColor: colors.themeColor,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <StatusBar style="light" />
      <Image source={images.omLogo} style={styles.img} resizeMode="contain" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  img: {
    tintColor: "#FFFFFF",
    width: scale(250),
    height: moderateScale(250),
  },
});
