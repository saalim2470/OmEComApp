import { ScrollView, StyleSheet, Text, View } from "react-native";
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

const GpsSearch = ({ data }) => {
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
  return (
    <View style={commonStyle.innerContainer}>
      <View style={{}}>
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
      <ScrollView>
        {searchResult?.map((item, index) => {
          return (
            <View
              style={{ borderWidth: 0.5, marginVertical: verticalScale(5) }}
            >
              <Text style={{ paddingHorizontal: moderateScale(5) }}>
                {item?.text}
              </Text>
              <Text
                style={{
                  padding: moderateScale(5),
                  fontSize: scale(10),
                }}
              >
                {item?.place_name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GpsSearch;

const styles = StyleSheet.create({});
