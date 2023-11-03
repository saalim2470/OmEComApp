import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import commonStyle from "../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import { Image } from "react-native";
import images from "../Constants/images";

const SearchScreenCard = ({ style = {}, data }) => {
  return (
    <View style={{ ...styles.cardView, ...style }}>
      <View style={[commonStyle.row, { marginBottom: verticalScale(5) }]}>
        <Text style={styles.cardHeadingTxt}>{data.heading}</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={images.bellIcon}
            style={{ width: scale(22), height: scale(22) }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.smallTxt}>{data.subTxt}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.btnStyle,
          {
            backgroundColor: data.isFollow ? colors.selectedColor : null,
            borderWidth: data.isFollow ? null : 1,
            borderColor: data.isFollow ? null : "#a07bb3",
          },
        ]}
      >
        <Text
          style={[
            styles.btnTxt,
            { color: data.isFollow ? "#FFFFFF" : "#a07bb3" },
          ]}
        >
          {data.isFollow ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchScreenCard;

const styles = StyleSheet.create({
  smallTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(12),
  },
  cardView: {
    width: scale(250),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: "#faf7fe",
    marginRight: moderateScale(10),
  },
  cardHeadingTxt: {
    fontSize: moderateScale(15),
    fontFamily: "Montserrat-Bold",
  },
  btnStyle: {
    alignSelf: "flex-start",
    backgroundColor: colors.selectedColor,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5.5),
    alignItems: "center",
  },
  btnTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(10),
    color: "#FFFFFF",
  },
});
