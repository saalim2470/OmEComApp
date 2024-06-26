import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { baseURL, serverImagePath } from "../../../Constants/defaults";
import VideoViewer from "./VideoViewer";
import colors from "../../../Constants/colors";
import { scale, verticalScale } from "react-native-size-matters";
import { getFileExtension, imageExtensions } from "../../../Constants/Constant";
import { Image } from "expo-image";
import { ResizeMode, Video } from "expo-av";

const SCREEM_WIDTH = Dimensions.get("window").width;
const ImageVideoSlider = ({
  sliderData,
  onClickImage,
  disable,
  shouldVideoPlay,
  currentPost,
  postDetail,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    setCurrentSlide(viewableItems[0].index);
  };
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disable}
        onPress={() => onClickImage()}
        style={styles.sliderImageContainer}
      >
        {imageExtensions.includes(getFileExtension(item)) ? (
          <Image
            source={{
              uri: `${baseURL}${serverImagePath}/${item}`,
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
            style={styles.sliderImage}
          />
        ) : (
          <VideoViewer
            item={`${baseURL}${serverImagePath}/${item}`}
            postDetail={postDetail}
            currentFeedPost={currentPost}
            currentSliderIndex={currentSlide}
            index={index}
            shouldPlay={
              // index === currentSlide || shouldVideoPlay ? true : false
              index === currentSlide && currentPost === postDetail?.id
                ? true
                : false
            }
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={sliderData}
        horizontal={true}
        snapToInterval={SCREEM_WIDTH}
        snapToAlignment="center"
        decelerationRate={"fast"}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: verticalScale(300),
          offset: verticalScale(300) * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 30,
        }}
        scrollEventThrottle={0}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {sliderData?.length != 1 && (
        <View style={styles.dotStyleWrapper}>
          {sliderData?.map((item, index) => {
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
      )}
    </View>
  );
};

export default memo(ImageVideoSlider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  video: {
    width: SCREEM_WIDTH,
    height: verticalScale(200),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderImageContainer: {
    width: SCREEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(300),
  },
  sliderImage: {
    width: "100%",
    height: "100%",
  },
  videoStyle: {
    width: SCREEM_WIDTH,
    height: verticalScale(300),
  },
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
    width: SCREEM_WIDTH,
    position: "absolute",
    bottom: verticalScale(5),
  },
});
