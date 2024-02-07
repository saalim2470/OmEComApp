import { FlatList, StyleSheet, View } from "react-native";
import React, { memo, useState } from "react";
import colors from "../../Constants/colors";
import { SliderBox } from "react-native-image-slider-box";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const Slider = ({ data, onClick, disable }) => {
  const [layout, setLayout] = useState({ width: 0 });
  console.log('-=-=layout-=-=',layout);
  const onLayout = (e) => {
    setLayout({
      width: e.nativeEvent.layout.width,
    });
  };
  return (
    <View style={styles.cardImgView} onLayout={onLayout}>
      <SliderBox
        images={data}
        sliderBoxHeight={"100%"}
        dotColor={colors.themeColor}
        inactiveDotColor={"#F7F7F7"}
        disableOnPress={disable}
        imageLoadingColor={colors.themeColor}
        dotStyle={styles.dotStyle}
        parentWidth={layout.width}
        onCurrentImagePressed={() => {
          onClick();
        }}
      />
    </View>
    // <View style={styles.cardImgView}>
    //   <FlatList
    //     data={data}
    //     keyExtractor={(item, index) => {
    //       // item.id.toString();
    //     }}
    //     horizontal={true}
    //     pagingEnabled={true}
    //     renderItem={({ item, index }) => {
    //       return (
    //         <View style={{ borderWidth: 1, height: "100%", width: "100%" }}>
    //           <Image
    //             source={{ uri: item }}
    //             style={{ height: "100%", width: "100%" }}
    //           />
    //         </View>
    //       );
    //     }}
    //   />
    // </View>
  );
};

export default memo(Slider);

const styles = StyleSheet.create({
  cardImgView: {
    height: verticalScale(300),
    marginVertical: verticalScale(3),
    width: "100%",
    // borderWidth: 1,
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
