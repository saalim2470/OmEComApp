import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeHeader from "../../Components/CustomeHeader";
import commonStyle from "../../Constants/commonStyle";
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
