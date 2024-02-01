import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import { useNavigation } from "@react-navigation/native";
import RoundCategoryView from "../../Components/HomeScreenComponent/RoundCategoryView";
import { Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import SliderCard from "../../Components/HomeScreenComponent/SliderCard";
import screenName from "../../Constants/screenName";
import CustomeBottomSheet from "../../Components/CustomeBottomSheet";
import { setCategoryId } from "../../store/StoreDataSlice";
import { useDispatch } from "react-redux";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import CardSlider from "../../Components/HomeScreenComponent/CardSlider";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const [adImg, setAdImg] = useState();
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      <RoundCategoryView
        onClickCategory={(id) => {
          navigation.navigate(screenName.bottomNavigation, {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.mainHome,
            },
          });
        }}
      />
      <Divider style={{ marginVertical: verticalScale(8) }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <BannerSlider
          data={img}
          onClick={(index) => {
            setAdImg(img[index]);
            setIsShowBottomSheet(true);
          }}
        />
        <View
          style={{
            marginTop: verticalScale(10),
          }}
        >
          <CardSlider
            data={sliderData}
            onClickCard={(item) => {
              setAdImg(item);
              setIsShowBottomSheet(true);
            }}
          />
        </View>
      </ScrollView>
      <CustomeBottomSheet
        isOpen={isShowBottomSheet}
        setIsOpen={setIsShowBottomSheet}
        data={adImg}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
