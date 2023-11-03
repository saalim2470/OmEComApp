import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import commonStyle from "../Constants/commonStyle";
import MainAppHeader from "../Components/MainAppHeader";
import colors from "../Constants/colors";
import CustomeButton from "../Components/CustomeButton";
import screenName from "../Constants/screenName";
import { useNavigation } from "@react-navigation/native";

const TellUsAboutSize = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      categoryName: "Upperwear",
      tags: [
        {
          id: 0,
          tagName: "XXl",
          isSelect: false,
        },
        {
          id: 1,
          tagName: "S",
          isSelect: false,
        },
        {
          id: 2,
          tagName: "M",
          isSelect: false,
        },
        {
          id: 3,
          tagName: "L",
          isSelect: false,
        },
      ],
    },
    {
      categoryName: "Shoes",
      tags: [
        {
          id: 0,
          tagName: "6",
          isSelect: false,
        },
        {
          id: 1,
          tagName: "6.5",
          isSelect: false,
        },
        {
          id: 2,
          tagName: "7",
          isSelect: false,
        },
        {
          id: 3,
          tagName: "8",
          isSelect: false,
        },
        {
          id: 0,
          tagName: "6",
          isSelect: false,
        },
        {
          id: 1,
          tagName: "6.5",
          isSelect: false,
        },
        {
          id: 2,
          tagName: "7",
          isSelect: false,
        },
        {
          id: 3,
          tagName: "8",
          isSelect: false,
        },
      ],
    },
    {
      categoryName: "Pants",
      tags: [
        {
          id: 0,
          tagName: "XXl",
          isSelect: false,
        },
        {
          id: 1,
          tagName: "S",
          isSelect: false,
        },
        {
          id: 2,
          tagName: "M",
          isSelect: false,
        },
        {
          id: 3,
          tagName: "L",
          isSelect: false,
        },
      ],
    },
  ]);
  const selectorUnselectTag = (index, index1) => {
    const tempData = [...data];
    const tempData2 = [];
    tempData[index].tags.map((value, ind) => {
      if (ind == index1) {
        tempData2.push({
          ...value,
          isSelect: !value.isSelect,
        });
      } else {
        tempData2.push(value);
      }
    });
    tempData[index].tags = tempData2;
    setData(tempData);
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainAppHeader />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Tell us about you</Text>
        <Text style={styles.subTxt}>
          Choose sizes so we can find the most appropriate items for you
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.tagHeadingRow} key={index}>
                  <Text
                    style={[
                      commonStyle.headingTxt,
                      {
                        fontSize: moderateScale(12),
                        marginVertical: moderateVerticalScale(5),
                      },
                    ]}
                  >
                    {item.categoryName}
                  </Text>
                  <Text style={styles.tagSizeTxt}>Size : Uk</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {item?.tags.map((item1, index1) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          selectorUnselectTag(index, index1);
                        }}
                        style={[
                          styles.tagBtn,
                          {
                            backgroundColor: item1.isSelect
                              ? colors.selectedColor
                              : colors.unSelectedColor,
                          },
                        ]}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.tagTxt,
                            { color: item1.isSelect ? "#FFFFFF" : "#000000" },
                          ]}
                        >
                          {item1?.tagName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            );
          }}
        />
        <CustomeButton
          title={"Next"}
          onClick={() => {
            navigation.navigate(screenName.suggestStore);
          }}
          style={{
            height: verticalScale(38),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TellUsAboutSize;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
    fontSize: moderateScale(12),
    fontFamily: "Montserrat-Light",
    lineHeight: 20,
  },
  tagSizeTxt: {
    fontFamily: "Montserrat-Light",
    marginLeft: moderateScale(20),
    fontSize: moderateScale(10.5),
  },
  tagHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateVerticalScale(7),
  },
  tagBtn: {
    opacity: 0.9,
    width: scale(40),
    height: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(8),
    marginTop: verticalScale(5),
  },
  tagTxt: {
    fontSize: moderateScale(10),
    fontFamily: "Montserrat-Bold",
    color: "#FFFFFF",
  },
});
