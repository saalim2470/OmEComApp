import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ShimmerLoading = () => {
  const renderItem = () => {
    return (
      <View style={{ marginBottom: verticalScale(8) }}>
        <View style={styles.row}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.round}
          ></ShimmerPlaceholder>
          <View style={{ gap: scale(4) }}>
            <ShimmerPlaceholder
              style={{ width: scale(250) }}
            ></ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={{ width: scale(150) }}
            ></ShimmerPlaceholder>
          </View>
        </View>
        <ShimmerPlaceholder
          style={{
            height: verticalScale(200),
            width: "100%",
            marginTop: verticalScale(5),
          }}
        ></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.stripe,
            {
              width: scale(250),
            },
          ]}
        ></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.stripe,
            {
              width: scale(150),
            },
          ]}
        ></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.stripe,
            {
              width: scale(100),
            },
          ]}
        ></ShimmerPlaceholder>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={() => {}}
        renderItem={renderItem}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
      />
    </View>
  );
};

export default ShimmerLoading;

const styles = StyleSheet.create({
  round: {
    width: scale(40),
    height: scale(40),
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    paddingHorizontal: moderateScale(10),
  },
  stripe: {
    marginTop: verticalScale(5),
    paddingHorizontal: moderateScale(10),
  },
});
