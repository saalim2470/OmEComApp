import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import screenName from "../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import { baseURL, serverImagePath } from "../Constants/defaults";

const ImageGrid = ({ data }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenName.productDetail, { data: item });
          }}
          activeOpacity={0.5}
          style={{
            flex: 1,
            flexDirection: "column",
            margin: moderateScale(2),
          }}
        >
          <Image
            style={styles.imageThumbnail}
            source={{
              uri: item?.imagesData[0],
            }}
          />
        </TouchableOpacity>
      )}
      numColumns={2}
      keyExtractor={(item, index) => item.id}
    />
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(150),
  },
});
