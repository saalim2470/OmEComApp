import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

const Specification = () => {
  const data = [
    {
      id: 1,
      label: "Brand",
      value: "LG",
    },
    {
      id: 2,
      label: "Located In",
      value: "Surat",
    },
    {
      id: 3,
      label: "Condition",
      value: "Brand New",
    },
  ];
  return (
    <View style={{ marginTop: verticalScale(5) }}>
      {data.map((item, index) => {
        return (
          <>
            <View style={styles.cardView} key={item.id.toString()}>
              <Text style={styles.labelTxt}>{item.label}</Text>
              <Text style={styles.valueTxt}>{item.value}</Text>
            </View>
            <Divider bold />
          </>
        );
      })}
    </View>
  );
};

export default Specification;

const styles = StyleSheet.create({
  cardView: {
    flexDirection: "row",
    padding: scale(8),
  },
  labelTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(12),
    flex: 0.5,
  },
  valueTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
    flex: 1,
    textAlign: "right",
  },
});
