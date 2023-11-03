import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import CustomeButton from "./CustomeButton";

const ImageGridView = ({ data }) => {
  const flatListEnd = () => {
    return (
      <View
        style={{
          //   position: "absolute",
          //   bottom: verticalScale(15),
          width: "100%",
          paddingHorizontal: moderateScale(15),
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Not quite what you're looking for?
        </Text>
        <CustomeButton title={"Browse Categories"} />
      </View>
    );
  };
  return (
    <View style={{ marginBottom: verticalScale(10) }}>
      <FlatGrid
        // itemDimension={scale(100)}
        data={data}
        // fixed
        // spacing={moderateScale(3.5)}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: scale(100),
                height: scale(100),
              }}
            >
              <Image
                source={{
                  uri: item.url,
                }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ImageGridView;

const styles = StyleSheet.create({});
