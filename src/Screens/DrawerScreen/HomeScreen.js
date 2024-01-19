import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const img = [
    "https://images.unsplash.com/photo-1682687220363-35e4621ed990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1704928341414-5ae341023539?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1704981524675-d795f35805d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8",
  ];
  const sliderData = [
    {
      id: 1,
      title: "One Plus Nord ce3",
      uri: "https://image01-in.oneplus.net/india-oneplus-statics-file/epb/202306/26/9FxksqX4fQDqvJpU.png",
    },
    {
      id: 2,
      title: "Redmi Note 12",
      uri: "https://lh3.googleusercontent.com/spp/AE_ITi2lpH45J6FY7DuhQ0zaPVlZ9OD9S673-u6fmPAHzpTyd4GZ4rpPe7a_CD1vuudgtZvVGgtRC6kSq1IQs2lgX8wVV0PQdW4-oQEG4K3IrhQVGF0Qeuk4WQxQoJ-sv4EUCwm1wQKpoI5DaVG8q_FYNOJwOto9A9ugG5h3S2Ljqv6A7JWXfWmlTFkAYQ3lN_M0pbENvv8RSw=s512-rw-pd-pc0x00ffffff",
    },
    {
      id: 3,
      title: "Galaxy Z fold5",
      uri: "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-z-fold5/buy/Fold5_1440x450.jpg?$ORIGIN_JPG$",
    },
    {
      id: 4,
      title: "LG 11 Kg Front Fully Automatic Washing Machine, FHP1411Z9B",
      uri: "https://lh3.googleusercontent.com/spp/AE_ITi1zdAWLn64mQnxXO2jBkbeVF8nmwttUO6J1bQDzWs9VfI5JerD9l_82yMg39L3Ct3n5MK7xT_FGruyqJimsivHYog3TqKfcVsaylXVjZBoJFLxc4ZV8RFJ15xFk-LLFZH9iQkpXsEB6zafgsfSub5rYhA-6dVaSafYayE2V2EA3ZRgwMYY8sSAL-rpwhBqO_IpsRR37Qw=s512-rw-pd-pc0x00ffffff",
    },
  ];
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const [adImg, setAdImg] = useState();
  const renderCard = ({ item, index }) => {
    return <SliderCard item={item} />;
  };
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