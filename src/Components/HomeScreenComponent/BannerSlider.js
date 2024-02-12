import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../Constants/colors";
import { SliderBox } from "react-native-image-slider-box";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Image } from "expo-image";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BannerSlider = ({ data, onClick, disable }) => {
  const [layout, setLayout] = useState({ width: 0 });
  const [images, setImages] = useState([]);
  useEffect(() => {
    const imageData = [];
    data?.map((item, index) => {
      imageData.push(`${baseURL}${serverImagePath}/${item?.imagePath}`);
    });
    setImages(imageData);
  }, [data]);

  const onLayout = (e) => {
    setLayout({
      width: e.nativeEvent.layout.width,
    });
  };
  return (
    <View style={styles.cardImgView} onLayout={onLayout}>
      <SliderBox
        ImageComponent={Image}
        images={images}
        autoplay
        sliderBoxHeight={"100%"}
        dotColor={colors.themeColor}
        inactiveDotColor={"#F7F7F7"}
        disableOnPress={disable}
        imageLoadingColor={colors.themeColor}
        dotStyle={styles.dotStyle}
        circleLoop
        autoplayInterval={3000}
        parentWidth={layout.width}
        resizeMethod={"resize"}
        contentFit="contain"
        // style={{ aspectRatio: SCREEN_WIDTH / verticalScale(200) }}
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
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    overflow: "hidden",
    height: verticalScale(220),
    alignItems: "center",
    justifyContent: "center",
    // aspectRatio: SCREEN_WIDTH / verticalScale(200),
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
