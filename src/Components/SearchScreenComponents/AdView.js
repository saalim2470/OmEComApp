import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const AdView = ({ onClickAd = () => {}, disabled, data }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClickAd();
      }}
      activeOpacity={0.9}
      style={{ height: verticalScale(200) }}
      disabled={disabled}
    >
      <Image
        source={{
          uri: data,
        }}
        resizeMode="contain"
        style={{ height: "100%" }}
      />
    </TouchableOpacity>
  );
};

export default AdView;

const styles = StyleSheet.create({});
