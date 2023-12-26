import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import IconButton from "./IconButton";

const BottomComponent = ({
  onClickGallery = () => {},
  onClickCamera = () => {},
  onClickEmoji = () => {},
  onClickLocation = () => {},
}) => {
  return (
    <View style={styles.boxView}>
      <IconButton
        name={"ios-images"}
        color={"green"}
        onclick={() => {
          onClickGallery();
        }}
      />
      <IconButton
        name={"ios-camera"}
        color={"#ed840c"}
        onclick={() => {
          onClickCamera();
        }}
      />
      <Pressable
        onPress={() => {
          onClickEmoji();
        }}
      >
        <Entypo name="emoji-happy" size={scale(23)} color="#e3bf3d" />
      </Pressable>
      <IconButton
        name={"ios-location-sharp"}
        color={"#ed480c"}
        onclick={() => {
          onClickLocation();
        }}
      />
      {/* <Pressable style={styles.circle}>
      <SimpleLineIcons name="options" size={scale(20)} color="white" />
    </Pressable> */}
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({
  boxView: {
    borderWidth: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: scale(7),
    backgroundColor: "white",
  },
});
