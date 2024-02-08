import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { baseURL, serverImagePath } from "../../../Constants/defaults";
import VideoViewer from "./VideoViewer";
import colors from "../../../Constants/colors";
import { scale, verticalScale } from "react-native-size-matters";
import { getFileExtension, imageExtensions } from "../../../Constants/Constant";

const SCREEM_WIDTH = Dimensions.get("window").width;
const ImageVideoSlider = ({ sliderData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1200px-Sunflower_from_Silesia2.jpg",
    "http://media.w3.org/2010/05/sintel/trailer.mp4",
    "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
    "https://www.w3schools.com/html/movie.mp4",
    "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4",
    `${baseURL}${serverImagePath}/b4360b3b-4e84-440c-9c01-8d50ce6d4b2fimage_0.jpeg`,
  ];
  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    setCurrentSlide(viewableItems[0].index);
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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        scrollEventThrottle={0}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.sliderImageContainer}>
              {imageExtensions.includes(getFileExtension(item)) ? (
                <Image
                  source={{ uri: item, cache: "only-if-cached" }}
                  style={styles.sliderImage}
                />
              ) : (
                <VideoViewer item={item} />
              )}
            </View>
          );
        }}
      />
      {sliderData?.length != 1 && (
        <View style={styles.dotStyleWrapper}>
          {sliderData.map((item, index) => {
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

export default ImageVideoSlider;

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
    resizeMode: "contain",
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
