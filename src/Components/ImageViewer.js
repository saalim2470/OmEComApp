import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageView from "react-native-image-viewing";

const ImageViewer = ({ imgData, visible, setIsVisible }) => {
  return (
    <ImageView
      images={imgData}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => setIsVisible(false)}
    />
  );
};

export default ImageViewer;

const styles = StyleSheet.create({});
