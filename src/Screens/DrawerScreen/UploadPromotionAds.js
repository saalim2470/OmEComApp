import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeHeader from "../../Components/CustomeHeader";
import commonStyle from "../../Constants/commonStyle";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import HeaderWithButton from "../../Components/HeaderWithButton";
import CustomeButton from "../../Components/CustomeButton";
import images from "../../Constants/images";
import * as ImagePicker from "expo-image-picker";
import screenName from "../../Constants/screenName";
import UploadBannerAds from "../AdsScreen/UploadBannerAds";
import UploadSliderAds from "../AdsScreen/UploadSliderAds";

const UploadPromotionAds = ({ navigation, route }) => {
  const { title } = route?.params;
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={title} />
      {title === "Banner Ads" ? (
        <UploadBannerAds title={title} />
      ) : (
        <UploadSliderAds title={title} />
      )}
    </SafeAreaView>
  );
};

export default UploadPromotionAds;

const styles = StyleSheet.create({});
