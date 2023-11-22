import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../Constants/colors";
import { SliderBox } from "react-native-image-slider-box";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const Slider = ({ data }) => {
  return (
    <View style={styles.cardImgView}>
      <SliderBox
        images={data}
        sliderBoxHeight={"100%"}
        dotColor={colors.themeColor}
        inactiveDotColor={"#F7F7F7"}
        disableOnPress={true}
        imageLoadingColor={colors.themeColor}
        dotStyle={styles.dotStyle}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  cardImgView: {
    height: verticalScale(300),
    paddingVertical: verticalScale(3),
  },
  dotStyle: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(5),
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
  },
});
