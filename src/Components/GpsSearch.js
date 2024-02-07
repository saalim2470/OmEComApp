import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import TextBoxWithLabel from "./TextBoxWithLabel";
import images from "../Constants/images";
import colors from "../Constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";

const GpsSearch = ({ data, onClickLocationResult = () => {} }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const gpsData = useSelector((state) => state.gpsData);
  const onClickSearch = () => {
    dispatch(getGpsDataApi(searchKeyword));
  };
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.locationView}>
        <View style={styles.round}>
          <MaterialIcons name="location-pin" size={scale(25)} color="black" />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            onClickLocationResult(item);
          }}
          style={{ flex: 1 }}
        >
          <Text style={{ fontFamily: "Montserrat-Bold" }}>{item?.text}</Text>
          <Text style={styles.placeNameTxt}>{item?.place_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const debounce = (func, delay) => {
  //   let timeoutId;

  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  // const debouncedSearch = debounce(onClickSearch, 500);

  // const handleSearch = (text) => {
  //   setSearchKeyword(text);
  //   debouncedSearch(text);
  // };
  const debouncedSearch = _.debounce((searchKeyword) => {
    dispatch(getGpsDataApi(searchKeyword));
    console.log("=-=-new key word:=-=", searchKeyword);
  }, 500);

  const handleSearch = (text) => {
    setSearchKeyword(text);
    debouncedSearch(text);
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
          onchange={handleSearch}
        />
      </View>
      {!gpsData?.isLoading && gpsData?.gpsData?.length > 0 ? (
        <Text style={styles.headingTxt}>Search Results</Text>
      ) : null}
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
  round: {
    width: scale(35),
    height: scale(35),
    borderRadius: 50,
    backgroundColor: colors.greyColor,
    alignItems: "center",
    justifyContent: "center",
  },
  locationView: {
    flexDirection: "row",
    gap: scale(10),
    padding: moderateScale(5),
    // paddingVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
  },
  headingTxt: {
    fontSize: scale(16),
    fontFamily: "Montserrat-Bold",
    marginVertical: verticalScale(3),
  },
});
