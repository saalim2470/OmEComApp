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
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../../Constants/defaults";
import { useDispatch, useSelector } from "react-redux";
import { getCountryData } from "../../store/contrySlices/GetCountrySlice";

const Splash = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const countryData = useSelector((state) => state.getCountry.countryData);
  useEffect(() => {
    setTimeout(() => {
      getToken();
      // navigation.dispatch(StackActions.replace(screenName.introduction));
    }, 1500);
  });
  useEffect(() => {
    if (countryData != null && countryData?.Success) {
      navigation.dispatch(StackActions.replace(screenName.introduction));
    }
  }, [countryData]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem(accessToken);
      if (token != "" && token != null) {
        navigation.dispatch(StackActions.replace(screenName.drawerNavigation));
      } else {
        // check user user enter first time in app
        // if user enter first time in app navigate to intro else navigate to login
        navigation.dispatch(StackActions.replace(screenName.authRoute));
        dispatch(getCountryData(1, 10));
      }
    } catch (error) {}
  };
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
