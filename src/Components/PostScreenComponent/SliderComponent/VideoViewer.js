import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { millisecondsToMinutes } from "../../../Constants/Constant";
import Loading from "../../Loading";

const SCREEM_WIDTH = Dimensions.get("window").width;
const VideoViewer = ({
  item,
  shouldPlay,
  postDetail,
  currentFeedPost,
  currentSliderIndex,
  index,
}) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const handleVideoLoadStart = () => {
    setIsVideoLoading(true);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };
  return (
    <>
      {isVideoLoading && <Loading />}
      <View style={{ flex: 1 }}>
        <Video
          ref={video}
          shouldPlay={shouldPlay}
          style={styles.videoStyle}
          source={{
            uri: item,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={true}
          onLoadStart={handleVideoLoadStart}
          onLoad={handleVideoLoad}
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            video.current.setIsMutedAsync(!status?.isMuted);
          }}
          style={styles.muteBtn}
        >
          <Entypo
            name={status?.isMuted ? "sound-mute" : "sound"}
            size={scale(15)}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({
  videoStyle: {
    width: SCREEM_WIDTH,
    height: "100%",
  },
  muteBtn: {
    width: scale(22),
    height: scale(22),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(10),
    right: moderateScale(10),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
