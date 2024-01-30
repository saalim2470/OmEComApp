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
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getGpsDataApi } from "../store/gpsSlice/GetGpsData";

const GpsSearch = ({ data, onClickLocationResult = () => {} }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const gpsData = useSelector((state) => state.gpsData);
  const onClickSearch = () => {
    dispatch(getGpsDataApi(searchKeyword));
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onClickLocationResult(item);
        }}
        style={{
          marginVertical: verticalScale(5),
          padding: moderateScale(5),
        }}
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
      {gpsData?.isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={gpsData?.gpsData}
          keyExtractor={(item, index) => {
            return `search_${item.id}_${index}`;
          }}
          renderItem={renderItem}
          ItemSeparatorComponent={<Divider bold />}
        />
      )}
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
