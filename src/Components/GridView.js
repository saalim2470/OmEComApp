import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const GridView = ({ data, col = 2, addCloseBtn = () => {} }) => {
  return (
    <View style={styles.container}>
      {data?.map((item, index) => {
        return (
          <View key={index} style={{ width: 100 / col + "%" }}>
            <View style={{ padding: scale(4) }}>
              <View style={styles.image1}>
                {addCloseBtn(index)}
                <Image
                  source={{ uri: item }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "row", flexWrap: "wrap" },
  image1: {
    height: verticalScale(130),
    borderRadius: scale(5),
    marginBottom: verticalScale(8),
    overflow: "hidden",
  },
});
