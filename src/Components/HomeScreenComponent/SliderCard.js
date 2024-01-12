import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SliderCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <Text
        numberOfLines={2}
        style={{ fontFamily: "Montserrat-Medium", fontSize: scale(11) }}
      >
        {item?.title}
      </Text>
      <View style={styles.cardImgContainer}>
        <Image
          source={{
            uri: item?.uri,
          }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default SliderCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: scale(130),
    padding: moderateScale(5),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: moderateScale(6),
    height: verticalScale(150),
  },
  cardImgContainer: {
    height: verticalScale(120),
    marginTop: verticalScale(2),
  },
});
