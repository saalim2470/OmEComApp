import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SliderCard from "./SliderCard";
import { scale } from "react-native-size-matters";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const CardSlider = ({ data, onClickCard = () => {}, isLocalData }) => {
  const renderCard = ({ item, index }) => {
    return (
      <SliderCard
        item={item}
        image={
          isLocalData ? item : `${baseURL}${serverImagePath}/${item?.imagePath}`
        }
        data={data}
        index={index}
        onClickCard={() => {
          onClickCard(item);
        }}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ columnGap: scale(10) }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return `card_${item.id}_${index}`;
        }}
        renderItem={renderCard}
      />
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({});
