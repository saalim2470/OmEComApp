import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SvgUri } from "react-native-svg";
import { defaultCategoryImg } from "../Constants/defaults";
import { TouchableOpacity } from "react-native";
import { getAdContentByCategory } from "../store/AdContentSlices/GetAdContentSlice";
import { useDispatch } from "react-redux";
import colors from "../Constants/colors";

const CategorieCircle = ({ data, disabled, onClick = () => {} }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item?.id);
          dispatch(getAdContentByCategory(item.id, 1, 10));
        }}
        disabled={disabled}
        style={{
          alignItems: "center",
          marginLeft: moderateScale(15),
          marginRight: data?.length - 1 == index ? moderateScale(10) : null,
        }}
      >
        <View
          style={[
            styles.storyCircle,
            {
              borderColor:
                selectedCategory === item?.id ? colors.themeColor : null,
              borderWidth: selectedCategory === item?.id ? 2 : 0.5,
            },
          ]}
        >
          <SvgUri
            width={scale(43)}
            height={scale(43)}
            uri={
              item?.svgImagesPath != null
                ? item?.svgImagesPath
                : defaultCategoryImg
            }
          />
        </View>
        <Text style={styles.categoryTxt}>{item?.categoryName}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={renderItem}
    />
  );
};

export default CategorieCircle;

const styles = StyleSheet.create({
  storyCircle: {
    width: scale(52),
    height: scale(52),
    borderRadius: 100,
    alignItems: "center",
    borderWidth: 0.5,
    overflow: "hidden",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  categoryTxt: {
    width: scale(50),
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: scale(10),
  },
});
