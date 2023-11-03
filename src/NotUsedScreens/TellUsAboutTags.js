import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import commonStyle from "../Constants/commonStyle";
import MainAppHeader from "../Components/MainAppHeader";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import screenName from "../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import CustomeButton from "../Components/CustomeButton";
import colors from "../Constants/colors";

const TellUsAboutTags = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: 0,
      tag: "Burberry",
      isSelect: false,
    },
    {
      id: 1,
      tag: "Tommy Hilfiger",
      isSelect: false,
    },
    {
      id: 2,
      tag: "Streetwear",
      isSelect: false,
    },
    {
      id: 3,
      tag: "Le Flour",
      isSelect: false,
    },
    {
      id: 4,
      tag: "Golf",
      isSelect: false,
    },
    {
      id: 5,
      tag: "Nike",
      isSelect: false,
    },
    {
      id: 6,
      tag: "Adidas",
      isSelect: false,
    },
    {
      id: 7,
      tag: "Denim",
      isSelect: false,
    },
  ]);
  const selectorUnselectTag = (index) => {
    const tempData = [...data];
    const a = {
      ...tempData[index],
      isSelect: !tempData[index].isSelect,
    };
    tempData[index] = a;
    setData(tempData);
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainAppHeader />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Tell us about you</Text>
        <Text style={styles.subTxt}>Choose the looks you like</Text>
        {/* <FlatList
          data={data}
          contentContainerStyle={{
            flexDirection: "row",
            // flexWrap: "wrap",
            alignContent: "stretch",
            marginTop: verticalScale(5),
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tagBtn,
                  {
                    backgroundColor: item.isSelect
                      ? colors.selectedColor
                      : colors.unSelectedColor,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  selectorUnselectTag(index);
                }}
              >
                <Text
                  style={[
                    styles.tagTxt,
                    { color: item.isSelect ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  {item.tag}
                </Text>
              </TouchableOpacity>
            );
          }}
        /> */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: verticalScale(5),
          }}
        >
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tagBtn,
                  {
                    backgroundColor: item.isSelect
                      ? colors.selectedColor
                      : colors.unSelectedColor,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  selectorUnselectTag(index);
                }}
              >
                <Text
                  style={[
                    styles.tagTxt,
                    { color: item.isSelect ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  {item.tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <CustomeButton
          title={"Next"}
          onClick={() => {
            navigation.navigate(screenName.tellUsAboutSize);
          }}
          style={{
            height: verticalScale(38),
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignSelf: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TellUsAboutTags;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
    fontSize: moderateScale(12),
    fontFamily: "Montserrat-Light",
  },
  tagBtn: {
    paddingHorizontal: moderateScale(7),

    opacity: 0.9,
    height: moderateScale(23),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(6),
    marginTop: verticalScale(5),
  },
  tagTxt: {
    fontSize: moderateScale(9),
    fontFamily: "Montserrat-Bold",
  },
});
