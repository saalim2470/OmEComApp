import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { moderateScale, scale } from "react-native-size-matters";
import { SvgUri } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import {
  baseURL,
  defaultCategoryImg,
  serverImagePath,
} from "../../Constants/defaults";
import colors from "../../Constants/colors";

const HomeScreenCategory = ({
  data,
  item,
  index,
  selectedCategory,
  single,
  onClick = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
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
        {single ? (
          <SvgUri
            width={scale(43)}
            height={scale(43)}
            uri={item?.svgImagesPath}
          />
        ) : (
          <SvgUri
            width={scale(43)}
            height={scale(43)}
            // uri={
            //   item?.svgImagesPath != null
            //     ? `${baseURL}${serverImagePath}/${item?.svgImagesPath}`
            //     : defaultCategoryImg
            // }
            uri={item?.svgImagesPath}
          />
        )}
      </View>
      <Text style={styles.categoryTxt}>{item?.categoryName}</Text>
    </TouchableOpacity>
  );
};

export default HomeScreenCategory;

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
