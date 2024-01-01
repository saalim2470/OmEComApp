import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import screenName from "../../Constants/screenName";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import {
  baseURL,
  defaultCategoryImg,
  serverImagePath,
} from "../../Constants/defaults";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../store/StoreDataSlice";
import { allCategorie } from "../../Constants/Constant";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth / 3 - 15;
const CategoryView = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.cardWrapperView}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setCategoryId(allCategorie?.id));
          navigation.navigate(screenName.mainHome);
        }}
        activeOpacity={0.4}
        style={styles.cardView}
      >
        <SvgUri
          width={scale(35)}
          height={verticalScale(40)}
          uri={allCategorie.svgImagesPath}
        />
        <Text style={styles.categoryTxt}>{allCategorie.categoryName}</Text>
      </TouchableOpacity>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch(setCategoryId(item?.id));
              navigation.navigate(screenName.mainHome);
            }}
            activeOpacity={0.4}
            style={styles.cardView}
          >
            <SvgUri
              width={scale(35)}
              height={verticalScale(40)}
              uri={
                item?.svgImagesPath != null
                  ? `${baseURL}${serverImagePath}/${item?.svgImagesPath}`
                  : defaultCategoryImg
              }
            />
            <Text style={styles.categoryTxt}>{item?.categoryName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CategoryView;

const styles = StyleSheet.create({
  cardView: {
    width: width,
    alignItems: "center",
    paddingVertical: verticalScale(10),
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
  },
  cardWrapperView: {
    marginHorizontal: moderateScale(8),
    flexDirection: "row",
    gap: scale(10),
    flexWrap: "wrap",
    paddingVertical: verticalScale(10),
  },
  categoryTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
    marginTop: verticalScale(5),
  },
});
