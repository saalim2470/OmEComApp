import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SliderCard from "./SliderCard";

const CardSlider = ({ data, onClickCard = () => {} }) => {
  const renderCard = ({ item, index }) => {
    return (
      <SliderCard
        item={item}
        onClickCard={() => {
          onClickCard(index);
        }}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        horizontal
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
