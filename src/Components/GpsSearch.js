import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TextBox from "./TextBox";
import commonStyle from "../Constants/commonStyle";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import axios from "axios";
import { Divider } from "react-native-paper";

const GpsSearch = ({ data, onClickLocationResult = () => {} }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(data);
  const onClickSearch = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchKeyword}.json?access_token=pk.eyJ1IjoiYWZ6YWxwYXRlbDA5IiwiYSI6ImNscnl6YTRwYTFvNncya3RlMm43a3l4aXYifQ.zvQ0bjs4RBZp4jHf64d3ug`
      )
      .then(function (response) {
        setSearchResult(response?.data?.features);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onClickLocationResult(item);
        }}
        style={{ marginVertical: verticalScale(5) }}
      >
        <Text style={{ fontFamily: "Montserrat-Bold" }}>{item?.text}</Text>
        <Text style={styles.placeNameTxt}>{item?.place_name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={commonStyle.innerContainer}>
      <View style={{ marginBottom: verticalScale(10) }}>
        <TextBox
          placeholder={"Search something"}
          value={searchKeyword}
          autoFocus={true}
          returnKeyType={"search"}
          onSubmitEditing={() => {
            onClickSearch();
          }}
          onchange={(value) => {
            setSearchKeyword(value);
          }}
        />
      </View>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => {
          return `search_${item.id}_${index}`;
        }}
        renderItem={renderItem}
        ItemSeparatorComponent={<Divider bold />}
      />
    </View>
  );
};

export default GpsSearch;

const styles = StyleSheet.create({
  placeNameTxt: {
    fontSize: scale(10),
    fontFamily: "Montserrat-Medium",
    paddingTop: verticalScale(3),
  },
});
