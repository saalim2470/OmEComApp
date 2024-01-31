import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import SubscriptionHeading from "../../Components/SubscriptionComponents/SubscriptionHeading";
import colors from "../../Constants/colors";
import HeaderWithButton from "../../Components/HeaderWithButton";
import SliderCard from "../../Components/HomeScreenComponent/SliderCard";
import screenName from "../../Constants/screenName";
import images from "../../Constants/images";

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
  const renderCard = ({ item, index }) => {
    return <SliderCard item={item} onClickCard={() => {}} />;
  };
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
      <BannerSlider data={img} onClick={(index) => {}} />
      <HeaderWithButton
        title={"Slider Ad"}
        onClick={() => {
          navigation.navigate(screenName.uploadPromotionAds, {
            title: "Slider Ads",
          });
        }}
        style={{ marginTop: verticalScale(8) }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={sliderData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => {
            return `card_${item.id}_${index}`;
          }}
          renderItem={renderCard}
        />
      </View>
    </SafeAreaView>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  headingWrapper: {
    //   borderWidth: 1,
    marginHorizontal: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingBtn: {
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: colors.themeColor,
    paddingHorizontal: moderateScale(8),
  },
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(10),
  },
});
