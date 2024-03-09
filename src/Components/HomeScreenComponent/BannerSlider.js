import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../Constants/colors";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Image } from "expo-image";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;
const BannerSlider = ({ data, onClick=()=>{}, disable, isLocalData }) => {
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const imageData = [];
    data?.map((item, index) => {
      imageData.push(`${baseURL}${serverImagePath}/${item?.imagePath}`);
    });
    setImages(imageData);
  }, [data]);
  return (
    <View style={styles.cardImgView}>
      <Carousel
        loop
        width={width}
        height={verticalScale(220)}
        autoPlay={images.length !== 1 ? true : false}
        autoPlayInterval={3000}
        data={data}
        enabled={images.length !== 1 ? true : false}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentSlide(index)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={disable}
            onPress={() => {
              onClick(item);
            }}
          >
            {!isLocalData ? (
              <Image
                source={{
                  uri: `${baseURL}${serverImagePath}/${item?.imagePath}`,
                }}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                placeholder={blurhash}
                cachePolicy={"memory"}
              />
            ) : (
              <Image
                source={{
                  uri: item,
                }}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                placeholder={blurhash}
                cachePolicy={"memory"}
              />
            )}
          </TouchableOpacity>
        )}
      />
      <View style={styles.dotStyleWrapper}>
        {images.map((item, index) => {
          return (
            <View
              style={[
                styles.dotStyle,
                {
                  backgroundColor:
                    currentSlide === index ? colors.themeColor : "grey",
                },
              ]}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  cardImgView: {
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    overflow: "hidden",
    height: verticalScale(220),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E4E2",
  },
  // dotStyle: {
  //   width: scale(7),
  //   height: scale(7),
  //   borderRadius: scale(5),
  //   marginHorizontal: 0,
  //   padding: 0,
  //   margin: 0,
  // },
  dotStyle: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
  },
  dotStyleWrapper: {
    flexDirection: "row",
    gap: scale(8),
    alignItems: "center",
    justifyContent: "center",
    width: width,
    position: "absolute",
    bottom: verticalScale(5),
  },
});
