import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import HeaderWithButton from "../../Components/HeaderWithButton";
import screenName from "../../Constants/screenName";
import CardSlider from "../../Components/HomeScreenComponent/CardSlider";

const Promotion = ({ navigation }) => {
  const img = [
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://cdn.dribbble.com/users/5799567/screenshots/14095208/media/f3fa8ff3516ebb164b659431af01a40b.jpg?resize=400x300&vertical=center",
  ];
  const sliderData = [
    "https://image01-in.oneplus.net/india-oneplus-statics-file/epb/202306/26/9FxksqX4fQDqvJpU.png",
    "https://i.pinimg.com/736x/ec/8d/50/ec8d5001b929a1b643d1bd1932eba4d9.jpg",
    "https://mir-s3-cdn-cf.behance.net/projects/404/2ee493102979329.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9nAV0o49dha2PwwuhdhmcoVtHIzPiXNEKH1CYjXgCFB0i6Z4FJYilH55oLqxYNDBNFs&usqp=CAU",
  ];
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Promotion"} />
      <HeaderWithButton
        title={"Banner Ad"}
        onClick={() => {
          navigation.navigate(screenName.uploadPromotionAds, {
            title: "Banner Ads",
          });
        }}
        style={{ marginBottom: verticalScale(8) }}
      />
      <BannerSlider data={img} disable={true} isLocalData={true} />
      <HeaderWithButton
        title={"Slider Ad"}
        onClick={() => {
          navigation.navigate(screenName.uploadPromotionAds, {
            title: "Slider Ads",
          });
        }}
        style={{ marginTop: verticalScale(8) }}
      />
      <CardSlider data={sliderData} isLocalData={true} />
    </SafeAreaView>
  );
};

export default Promotion;

const styles = StyleSheet.create({});
