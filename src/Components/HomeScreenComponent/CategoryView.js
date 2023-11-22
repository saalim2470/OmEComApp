import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import screenName from "../../Constants/screenName";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import { defaultCategoryImg } from "../../Constants/defaults";
import { useDispatch } from "react-redux";
import { getAdContentByCategory } from "../../store/AdContentSlices/GetAdContentSlice";

const CategoryView = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(getAdContentByCategory(data?.id, 1, 10));
        navigation.navigate(screenName.bottomNavigation, {
          screen: screenName.mainHome,
          params: {
            categoryId: data?.id,
            categoryName: data?.categoryName,
          },
        });
      }}
      activeOpacity={0.4}
      style={styles.categoryCard}
    >
      <Text style={styles.categoryTxt}>{data?.categoryName}</Text>

      <View style={styles.imgView}>
        <SvgUri
          width={scale(70)}
          height={verticalScale(75)}
          uri={
            data?.svgImagesPath != null
              ? data?.svgImagesPath
              : defaultCategoryImg
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryView;

const styles = StyleSheet.create({
  imgView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: scale(70),
    height: verticalScale(75),
  },
  categoryCard: {
    width: scale(160),
    // flex: 1,
    height: verticalScale(90),
    backgroundColor: colors.greyColor,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(5),
    borderRadius: scale(8),
  },
  categoryTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
  },
});
