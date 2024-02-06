import * as React from "react";
import { View, StyleSheet, Button, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { scale, verticalScale } from "react-native-size-matters";

export default function Video1() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const data = [
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://cdn.dribbble.com/users/5799567/screenshots/14095208/media/f3fa8ff3516ebb164b659431af01a40b.jpg?resize=400x300&vertical=center",
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* <View
        style={{
          height: 200,
          borderWidth: 1,
          marginHorizontal: 10,
        }}
      >
    
      </View> */}
      <View style={{ height: verticalScale(200) }}>
        <FlatList
          data={data}
          contentContainerStyle={{ flex: 1 }}
          horizontal
          pagingEnabled={true}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  height: verticalScale(200),
                  width: "90%",
                }}
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="stretch"
                />
              </View>
            );
          }}
        />
      </View>
      {/* <VideoPlayer
        videoProps={{
          shouldPlay: false,
          defaultControlsVisible: false,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          },
          isMuted: true,
        }}
        style={{
          width: 350,
          height: 300,
          videoBackgroundColor: "#262626",
        }}
        autoHidePlayer={true}
      /> */}
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
