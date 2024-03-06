import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";

const CustomeFlatlist = ({
  data,
  renderItem,
  onEndReached,
  listFooterComponent,
  onRefresh,
  refreshing,
  onViewableItemsChanged,
}) => {
  const maxToRenderPerBatch = 100;
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => {
        return `data_${item.id}_${index}`;
      }}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={1}
      onEndReached={onEndReached}
      contentContainerStyle={{
        gap: scale(10),
        paddingBottom: verticalScale(10),
      }}
      ItemSeparatorComponent={
        <Divider style={{ marginBottom: verticalScale(8) }} />
      }
      ListFooterComponent={listFooterComponent}
      renderItem={renderItem}
      initialNumToRender={40}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={5}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      scrollEventThrottle={12}
      fadeDuration={0}
    />
  );
};

export default CustomeFlatlist;

const styles = StyleSheet.create({});
