import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../Constants/colors";
import FeedCard from "./ProductComponent/FeedCard";
import screenName from "../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";

const ListingComponent = ({
  data,
  onReachedEnd = () => {},
  loadMore,
  refreshing,
  onRefresh = () => {},
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
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        isVideoPlay={currentIndex === index ? true : false}
        onClickMoreBtn={() => {
          onClickMoreBtn(item);
        }}
      />
    );
  };
  const onClickMoreBtn = useCallback((item) => {
    navigation.navigate(screenName.productDetail, { data: item });
  }, []);

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index);
  };
  return (
    <View style={{ marginBottom: verticalScale(150) }}>
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
        fadeDuration={0}
      />
    </View>
  );
};

export default ListingComponent;

const styles = StyleSheet.create({});
