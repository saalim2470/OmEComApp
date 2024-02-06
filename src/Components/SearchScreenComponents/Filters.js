import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import { Divider, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilterId } from "../../store/StoreDataSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filterType = useSelector((state) => state.storeData.searchFilterId);
  const filterContent = [
    {
      id: 1,
      title: "Search by category",
    },
    {
      id: 2,
      title: "Search by users",
    },
    {
      id: 3,
      title: "Search by content",
    },
  ];
  return (
    <View style={{ marginHorizontal: moderateScale(10), flex: 1 }}>
      <Text style={styles.heading}>Filter</Text>
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: verticalScale(8) }}
      >
        {filterContent.map((item, index) => {
          return (
            <View style={styles.filterRow} key={item?.id.toString()}>
              <Text style={styles.filterTxt}>{item?.title}</Text>
              <RadioButton
                value={filterType}
                status={filterType === item?.id ? "checked" : "unchecked"}
                color={colors.selectedColor}
                onPress={() => {
                  dispatch(setSearchFilterId(item?.id));
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(18),
    marginBottom: verticalScale(7),
    textAlign: "center",
    marginTop: verticalScale(8),
  },
  filterRow: {
    marginVertical: verticalScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterTxt: {
    fontSize: scale(15),
    fontFamily: "Montserrat-Regular",
  },
});
