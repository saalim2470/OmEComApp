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
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://cdn.dribbble.com/users/5799567/screenshots/14095208/media/f3fa8ff3516ebb164b659431af01a40b.jpg?resize=400x300&vertical=center",
  ];
  const sliderData = [
    {
      id: 1,
      title: "One Plus Nord ce3",
      uri: "https://image01-in.oneplus.net/india-oneplus-statics-file/epb/202306/26/9FxksqX4fQDqvJpU.png",
    },
    {
      id: 2,
      title: "Amazing food",
      uri: "https://i.pinimg.com/736x/ec/8d/50/ec8d5001b929a1b643d1bd1932eba4d9.jpg",
    },
    {
      id: 3,
      title: "Service provider",
      uri: "https://mir-s3-cdn-cf.behance.net/projects/404/2ee493102979329.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
    },
    {
      id: 4,
      title: "World tour",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9nAV0o49dha2PwwuhdhmcoVtHIzPiXNEKH1CYjXgCFB0i6Z4FJYilH55oLqxYNDBNFs&usqp=CAU",
    },
  ];
  const renderCard = ({ item, index }) => {
    return (
      <SliderCard
        item={item}
        onClickCard={() => {
          setAdImg(item?.uri);
          setIsShowBottomSheet(true);
        }}
      />
    );
  };
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const [adImg, setAdImg] = useState();
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
        <BannerSlider
          data={img}
          onClick={(index) => {
            setAdImg(img[index]);
            setIsShowBottomSheet(true);
          }}
        />
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
      </ScrollView>
      <CustomeBottomSheet
        isOpen={isShowBottomSheet}
        setIsOpen={setIsShowBottomSheet}
        data={adImg}
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
