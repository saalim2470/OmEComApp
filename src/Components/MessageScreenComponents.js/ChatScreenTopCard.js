import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const ChatScreenTopCard = () => {
  return (
    <>
      <View style={styles.msgTopCard}>
        <View style={styles.msgTopCardLeftView}>
          <View style={styles.msgTopCardLeftViewImgView}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYD3hYDclwN2jlwIb89z6-wqIIjMkHU9aiw&usqp=CAU",
              }}
            />
          </View>
          <View>
            <Text style={styles.titleTxt}>FableStreet</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: verticalScale(5),
              }}
            >
              <Text
                style={[styles.lightTxt, { marginRight: moderateScale(15) }]}
              >
                Price:12347
              </Text>
              <Text style={styles.lightTxt}>Shipping:1129</Text>
            </View>
          </View>
        </View>
        <View>
          <Image
            source={images.back_Icon}
            style={[styles.arrowIcon, { transform: [{ rotate: "180deg" }] }]}
          />
        </View>
      </View>
      <Divider style={{ marginTop: verticalScale(10) }} />
    </>
  );
};

export default ChatScreenTopCard;

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(13),
    lineHeight: 18,
  },
  lightTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(9),
    lineHeight: 20,
  },
  msgTopCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  msgTopCardLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTopCardLeftViewImgView: {
    width: scale(80),
    height: verticalScale(70),
    marginRight: moderateScale(10),
  },
  arrowIcon: {
    width: scale(23),
    height: scale(23),
  },
});
