import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import { setCategoryId } from "../../store/StoreDataSlice";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth / 3 - 15;
const CategoryView = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.cardWrapperView}>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              // dispatch(getAdContentByCategory(item?.id, 1, 10));
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
                  ? item?.svgImagesPath
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
