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

const Filters = ({onClickFilter=()=>{}}) => {
  const [selectFilter, setSelectFilter] = useState();
  const filterContent = [
    {
      id: 1,
      title: "Search by category",
    },
    {
      id: 2,
      title: "Search by content",
    },
    {
      id: 3,
      title: "Search by users",
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
                value={selectFilter}
                status={selectFilter === item?.id ? "checked" : "unchecked"}
                color={colors.selectedColor}
                onPress={() => {
                  setSelectFilter(item?.id);
                  onClickFilter(item?.id)
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
    marginTop:verticalScale(8)
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
