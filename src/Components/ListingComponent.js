import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../Constants/colors";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";

const ListingComponent = ({
  data,
  onReachedEnd = () => {},
  loadMore,
  refreshing,
  onRefresh = () => {},
  style,
  renderItem
}) => {
  const maxToRenderPerBatch = 100;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState();
  const listFooterComponent = () => {
    return (
      loadMore && (
        <ActivityIndicator
          style={{ paddingVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      // Set the currentIndex to the index of the first viewable item
      setCurrentIndex(viewableItems[0].index);
    }
  };
  const handleScroll = useCallback((event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.y;
    const index = Math.floor(contentOffset / viewSize) + 1;
    setCurrentIndex(index);
  }, []);
  return (
    <View style={style}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => {
          return `data_${item?.id}_${index}`;
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={() => {
          onReachedEnd();
        }}
        contentContainerStyle={{
          // gap: scale(10),
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
        // onViewableItemsChanged={onViewableItemsChanged}
        fadeDuration={0}
        onScroll={handleScroll}
        scrollEventThrottle={12}
      />
    </View>
  );
};

export default ListingComponent;

const styles = StyleSheet.create({});
