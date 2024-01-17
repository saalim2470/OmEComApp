import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ScrollView } from "react-native";
import CustomeBottomSheet from "../../Components/CustomeBottomSheet";
import AdView from "../../Components/SearchScreenComponents/AdView";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import SearchScreenTopView from "../../Components/SearchScreenComponents/SearchScreenTopView";
import SliderCard from "../../Components/HomeScreenComponent/SliderCard";

const Search = ({ navigation }) => {
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
  const renderCard = ({ item, index }) => {
    return <SliderCard item={item} />;
  };
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  return (
    <SafeAreaView style={commonStyle.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: verticalScale(22) }}
      >
        {/* search view */}
        <SearchScreenTopView />
        <Text
          style={[
            commonStyle.headingTxt,
            { fontSize: scale(12), paddingHorizontal: moderateScale(15) },
          ]}
        >
          Made for you
        </Text>
        <Text
          style={[
            styles.smallTxt,
            {
              marginTop: verticalScale(-5),
              paddingHorizontal: moderateScale(15),
            },
          ]}
        >
          Based on your recent activity
        </Text>
        {/* banner View */}
        <BannerSlider data={img} onClick={() => {}} />
        <View
          style={{
            marginTop: verticalScale(15),
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
        {/* ad view */}
        <Text
          style={[
            commonStyle.headingTxt,
            {
              fontSize: scale(12),
              paddingHorizontal: moderateScale(15),
              marginTop: verticalScale(15),
            },
          ]}
        >
          Sponserd Ads
        </Text>
        <AdView
          onClickAd={() => {
            setIsShowBottomSheet(true);
          }}
        />
      </ScrollView>
      <CustomeBottomSheet
        isOpen={isShowBottomSheet}
        setIsOpen={setIsShowBottomSheet}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  smallTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(12),
  },
});
