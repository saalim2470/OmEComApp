import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import commonStyle from "../../Constants/commonStyle";
import { Image } from "react-native";
import images from "../../Constants/images";
import colors from "../../Constants/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../../Constants/defaults";

const { width, height } = Dimensions.get("screen");
const Introduction = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(FlatList);
  const nextPress = (index) => {
    // if (index <= 4) {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index + 1,
    });
    // }
  };
  const data = [
    {
      id: 0,
      title: "Unleash the Shopaholic in You!",
      subTxt:
        "Buy a wide selection of brand-new & used fashion products to flaunt your style every season",
      img: images.introImg1,
    },
    {
      id: 1,
      title: "Sell Anything & Everything!",
      subTxt:
        "Whether designer, upmarket, or vintage, sell any type of apparels & footwear the easiest & most profitable way",
      img: images.introImg2,
    },
    {
      id: 2,
      title: "Turn Your Old Clothes & Shoes into Cash!",
      subTxt:
        "Buy a wide selection of brand-new & used fashion products to flaunt your style every season",
      img: images.introImg3,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        width: width,
      }}
    >
      <FlatList
        data={data}
        ref={flatListRef}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        keyExtractor={(item, index) => {
          item.id.toString();
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: width }} key={item.id}>
              <View style={{ flex: 0.7 }}>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View style={styles.bottomTxtBox}>
                <Text style={[commonStyle.headingTxt, { fontSize: scale(27) }]}>
                  {item.title}
                </Text>
                <Text style={styles.subTxt}>{item.subTxt}</Text>
                {index == data.length - 1 ? (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.replace(screenName.authRoute, {
                        screen: screenName.login,
                      });
                      // navigation.dispatch(
                      //   StackActions.replace(screenName.login)
                      // );
                    }}
                  >
                    <Text style={styles.btnTxt}>Get Started</Text>
                    <Image
                      source={images.back_Icon}
                      style={[
                        styles.arrowImg,
                        {
                          tintColor: colors.themeColor,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      nextPress(index);
                    }}
                  >
                    <Text style={styles.btnTxt}>Next</Text>
                    <Image
                      source={images.back_Icon}
                      style={[
                        styles.arrowImg,
                        {
                          tintColor: colors.themeColor,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(10),
    fontSize: scale(12),
    fontFamily: "Montserrat-Light",
    lineHeight: 20,
  },
  bottomTxtBox: {
    flex: 0.3,
    marginHorizontal: moderateScale(20),
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: moderateVerticalScale(30),
    marginRight: moderateScale(20),
  },
  arrowImg: {
    transform: [{ rotate: "180deg" }],
    width: scale(13),
    height: scale(13),
  },
  btnTxt: {
    fontFamily: "Montserrat-Bold",
    color: colors.themeColor,
    fontSize: scale(14),
  },
});
