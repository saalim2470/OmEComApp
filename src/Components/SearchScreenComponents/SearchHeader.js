import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import images from "../../Constants/images";
import TextBox from "../TextBox";
import { TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getSearchData } from "../../store/searchContentSlices/SearchContentSlice";

const SearchHeader = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchTxt, setSearchTxt] = useState("");
  const onClickSearch = () => {
    if (searchTxt != "") {
      dispatch(getSearchData(searchTxt, 1, 10));
    }
  };
  const onClickClearIcon = () => {
    setSearchTxt("");
  };
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
        value={searchTxt}
        autoFocus={true}
        returnKeyType={"search"}
        onSubmitEditing={() => {
          onClickSearch();
        }}
        onchange={(value) => {
          setSearchTxt(value);
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
          searchTxt != "" ? (
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
    marginTop: verticalScale(18),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
});
