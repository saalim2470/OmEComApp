import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import colors from "../../Constants/colors";
import { SliderBox } from "react-native-image-slider-box";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const BannerSlider = ({ data, onClick, disable }) => {
  const [layout, setLayout] = useState({ width: 0 });
  const onLayout = (e) => {
    setLayout({
      width: e.nativeEvent.layout.width,
    });
  };
  return (
    <View style={styles.cardImgView} onLayout={onLayout}>
      <SliderBox
        images={data}
        autoplay={true}
        sliderBoxHeight={"100%"}
        dotColor={colors.themeColor}
        inactiveDotColor={"#F7F7F7"}
        disableOnPress={disable}
        imageLoadingColor={colors.themeColor}
        dotStyle={styles.dotStyle}
        circleLoop={true}
        parentWidth={layout.width}
        onCurrentImagePressed={(index) => {
          onClick(index);
        }}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  cardImgView: {
    // height: verticalScale(300),
    // paddingVertical: verticalScale(3),
    // borderWidth: 1,
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    overflow: "hidden",
    height: verticalScale(200),
    alignItems: "center",
    justifyContent: "center",
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
