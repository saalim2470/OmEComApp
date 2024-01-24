import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SliderCard = ({ item, onClickCard = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onClickCard();
      }}
      style={styles.cardContainer}
    >
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
    </TouchableOpacity>
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
    marginVertical: verticalScale(5),
  },
  cardImgContainer: {
    height: verticalScale(120),
    marginTop: verticalScale(2),
  },
});
