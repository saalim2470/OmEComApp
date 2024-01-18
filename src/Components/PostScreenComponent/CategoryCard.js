import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { RadioButton } from "react-native-paper";
import colors from "../../Constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import {
  baseURL,
  defaultCategoryImg,
  serverImagePath,
} from "../../Constants/defaults";

const CategoryCard = ({ item, onClick = () => {}, status }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onClick();
      }}
      style={styles.categoryCard}
    >
      <View style={styles.categoryCardLeftView}>
        <SvgUri
          width={scale(40)}
          height={verticalScale(40)}
          uri={
            item?.svgImagesPath != null
              ? `${baseURL}${serverImagePath}/${item?.svgImagesPath}`
              : defaultCategoryImg
          }
        />
        <Text style={styles.categoryTxt}>{item.categoryName}</Text>
      </View>
      <RadioButton
        value={item.id}
        status={status === item.id ? "checked" : "unchecked"}
        color={colors.selectedColor}
        onPress={() => {
          onClick();
        }}
      />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    borderWidth: 0.5,
    height: verticalScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: "#FFFFFF",
    marginBottom: verticalScale(14),
  },
  categoryCardLeftView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  categoryTxt: {
    fontSize: scale(13),
    fontFamily: "Montserrat-Regular",
    marginLeft: moderateScale(5),
  },
});
