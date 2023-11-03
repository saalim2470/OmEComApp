import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import images from "../../Constants/images";
import SearchScreenCard from "../../Components/SearchScreenCard";
import colors from "../../Constants/colors";
import CategorieCircle from "../../Components/CategorieCircle";
import { ScrollView } from "react-native";
import screenName from "../../Constants/screenName";
import CustomeBottomSheet from "../../Components/CustomeBottomSheet";
import AdView from "../../Components/SearchScreenComponents/AdView";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Search = ({ navigation }) => {
  const categoryData = useSelector((state) => state.category.categoryData);
  const cardData = [
    {
      id: 0,
      heading: "Elenar Pena Jacket",
      subTxt: "124 New items found",
      isFollow: true,
    },
    {
      id: 1,
      heading: "Elenar Pena Jacket",
      subTxt: "124 New items found",
      isFollow: false,
    },
  ];
  const data = [
    {
      id: 0,
      icon: images.mobileIcon,
      isStory: true,
    },
    {
      id: 1,
      icon: images.clothesIcon,
      isStory: false,
    },
    {
      id: 2,
      icon: images.electronicIcon,
      isStory: false,
    },
    {
      id: 3,
      icon: images.groceryIcon,
      isStory: false,
    },
    {
      id: 4,
      icon: images.homeAppliancesIcon,
      isStory: false,
    },
    {
      id: 5,
      icon: images.toyIcon,
      isStory: false,
    },
  ];
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(-1);
  return (
    <SafeAreaView style={commonStyle.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: verticalScale(22) }}
      >
        {/* search view */}
        <View
          style={[commonStyle.row, { paddingHorizontal: moderateScale(15) }]}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.txtBoxView}
            onPress={() => {
              navigation.navigate(screenName.searchResultScreen);
              // navigation.dispatch(
              //   StackActions.replace(screenName.searchResultScreen)
              // );
            }}
          >
            <Image source={images.searchIcon} style={styles.serachIconStyle} />
            <Text style={styles.txtBoxPlaceholder}>Search something</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Image
              source={images.filterIcon}
              style={{ width: scale(20), height: scale(20) }}
            />
          </TouchableOpacity>
        </View>
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
        <View>
          <FlatList
            data={cardData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => {
              item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <SearchScreenCard
                  data={item}
                  style={{
                    marginLeft: index === 0 ? moderateScale(15) : null,
                    marginRight:
                      index === cardData.length - 1
                        ? moderateScale(15)
                        : moderateScale(15),
                  }}
                />
              );
            }}
          />
        </View>
        <View
          style={[
            commonStyle.row,
            {
              paddingHorizontal: moderateScale(15),
              marginTop: verticalScale(6),
              marginBottom: verticalScale(5),
            },
          ]}
        >
          <Text style={[commonStyle.headingTxt, { fontSize: scale(12) }]}>
            Suggested sellers
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.btnTxt}>+24 New</Text>
          </TouchableOpacity>
        </View>
        {/* categorie View */}
        <CategorieCircle data={categoryData?.Data} disabled={true} />
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
            setIsShowBottomSheet(0);
          }}
        />
      </ScrollView>
      <CustomeBottomSheet
        isShow={isShowBottomSheet}
        onChange={(value) => {
          setIsShowBottomSheet(value);
        }}
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
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    color: colors.themeColor,
    fontSize: scale(11),
  },
  txtBoxView: {
    borderWidth: 1,
    width: scale(280),
    flexDirection: "row",
    height: verticalScale(38),
    alignItems: "center",
    marginTop: verticalScale(10),
    paddingLeft: moderateScale(12),
    borderColor: "#cacaca",
  },
  txtBoxPlaceholder: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(12),
  },
  serachIconStyle: {
    width: scale(15),
    height: scale(15),
    marginRight: moderateScale(10),
  },
});
