import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import VideoViewer from "./SliderComponent/VideoViewer";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import { scale, verticalScale } from "react-native-size-matters";
import { getFileExtension, imageExtensions } from "../../Constants/Constant";
import { Image } from "expo-image";
import colors from "../../Constants/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MediaItem = ({ media, isVisible }) => {
  const videoRef = useRef(null);

  if (imageExtensions.includes(getFileExtension(media))) {
    return <ImageItem uri={media} />;
  } else {
    return <VideoItem uri={media} isVisible={isVisible} videoRef={videoRef} />;
  }
};

const ImageItem = ({ uri }) => {
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";
  return (
    <Image
      source={{
        uri: `${baseURL}${serverImagePath}/${uri}`,
      }}
      placeholder={blurhash}
      placeholderContentFit="cover"
      contentFit="contain"
      transition={1000}
      cachePolicy={"memory"}
      onLoadStart={() => {}}
      alt="Loading Image..."
      onLoad={() => {}}
      onError={(data) => {
        console.log("=-=-error=-=-", data);
      }}
      style={styles.media}
      //   style={styles.sliderImage}
    />
  );
};

const VideoItem = ({ uri, isVisible, videoRef }) => {
  return (
    <View style={styles.media}>
      <VideoViewer
        item={`${baseURL}${serverImagePath}/${uri}`}
        shouldPlay={isVisible}
      />
    </View>
  );
};

const ImageSlider = ({
  sliderData,
  onClickImage,
  disable,
  shouldVideoPlay,
  currentPost,
  postDetail,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleSnapToItem = (index) => {
    setActiveSlide(index);
  };

  const renderMediaItem = ({ item, index }) => {
    return (
      <Pressable disabled={disable} onPress={()=>{onClickImage()}}>
        <MediaItem
          media={item}
          isVisible={index === activeSlide && currentPost === postDetail?.id}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={sliderData}
        renderItem={renderMediaItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={handleSnapToItem}
      />
      <Pagination
        dotsLength={sliderData?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(300),
  },
  media: {
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    position: "absolute",
    bottom: verticalScale(5),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: colors.themeColor,
  },
  inactiveDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: "#FFF",
  },
});

export default ImageSlider;
