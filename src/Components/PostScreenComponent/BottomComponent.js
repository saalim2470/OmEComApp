import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {
  Ionicons,
  FontAwesome5,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import IconButton from "./IconButton";
import { Pressable } from "react-native";

const BottomComponent = () => {
  return (
    <View style={styles.boxView}>
      <IconButton name={"ios-images"} color={"green"} />
      <IconButton name={"ios-camera"} color={"#ed840c"} />
      <Pressable>
        <Entypo name="emoji-happy" size={scale(23)} color="#e3bf3d" />
      </Pressable>
      <IconButton name={"ios-location-sharp"} color={"#ed480c"} />
      <Pressable style={styles.circle}>
        <SimpleLineIcons name="options" size={scale(20)} color="white" />
      </Pressable>
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({
  boxView: {
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: scale(7),
  },
  circle: {
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#363230",
    padding: scale(3),
  },
});
