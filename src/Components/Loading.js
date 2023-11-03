import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../Constants/colors";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.themeColor} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
