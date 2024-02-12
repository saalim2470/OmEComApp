import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const AdView = ({ onClickAd = () => {}, disabled, data }) => {
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";
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
        cachePolicy={"memory"}
        contentFit="contain"
        placeholder={blurhash}
        placeholderContentFit="cover"
        style={{ height: "100%" }}
      />
    </TouchableOpacity>
  );
};

export default AdView;

const styles = StyleSheet.create({});
