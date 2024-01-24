import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";

const SubscriptionHeading = ({btnTxt='Read More...',subcriptionType,onClickRead=()=>{}}) => {
  return (
    <View style={styles.headingView}>
      <Text style={styles.headingTxt}>{subcriptionType}</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={()=>onClickRead()}>
        <Text style={styles.headingBtnTxt}>{btnTxt}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionHeading;

const styles = StyleSheet.create({
  headingView: {
    //   borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(7),
    backgroundColor: colors.greyColor,
  },
  headingTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(14),
  },
  headingBtnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(11),
  },
});
