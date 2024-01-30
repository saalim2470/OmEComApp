import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import images from "../../Constants/images";
import TextBox from "../TextBox";
import { TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getSearchData } from "../../store/searchContentSlices/SearchContentSlice";

const SearchHeader = ({
  onChange = () => {},
  value,
  onClickClearIcon = () => {},
  onClickSearch = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={images.back_Icon}
          style={[styles.iconStyle, { tintColor: "grey" }]}
        />
      </TouchableOpacity>
      <TextBox
        placeholder={"Search something"}
        containerStyle={{ flex: 1 }}
        value={value}
        autoFocus={true}
        returnKeyType={"search"}
        onSubmitEditing={() => {
          onClickSearch();
        }}
        onchange={(value) => {
          onChange(value);
        }}
        left={
          <TextInput.Icon
            icon={images.searchIcon}
            tintColor="grey"
            size={scale(15)}
            onPress={() => {
              onClickSearch();
            }}
          />
        }
        right={
          value != "" ? (
            <TextInput.Icon
              icon={images.closeCircleIcon}
              tintColor="grey"
              size={scale(22)}
              onPress={() => {
                onClickClearIcon();
              }}
            />
          ) : null
        }
      />
      {/* <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
        <Image source={images.filterIcon} style={styles.iconStyle} />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(10),
  },
});
