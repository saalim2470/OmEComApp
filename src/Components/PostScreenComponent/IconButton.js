import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

const IconButton = ({ name, color, onclick = () => {} }) => {
  return (
    <TouchableOpacity
    activeOpacity={0.6}
      onPress={() => {
        onclick();
      }}
    >
      <Ionicons name={name} size={scale(23)} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
