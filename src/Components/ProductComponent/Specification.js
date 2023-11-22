import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";

const Specification = ({ data1 }) => {
  return (
    <View style={{ marginTop: verticalScale(5) }}>
      {data1 != "string" ? (
        JSON.parse(data1).map((item, index) => {
          return (
            <>
              <View style={styles.cardView} key={index}>
                <Text style={styles.labelTxt}>{item.label}</Text>
                <Text style={styles.valueTxt}>{item.value}</Text>
              </View>
              <Divider bold />
            </>
          );
        })
      ) : (
        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: scale(12) }}>
          Specification Not Found
        </Text>
      )}
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
    flex: 0.6,
  },
  valueTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
    flex: 1,
    textAlign: "right",
  },
});
