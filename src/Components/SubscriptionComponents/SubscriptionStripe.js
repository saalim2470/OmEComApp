import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";

const SubscriptionStripe = ({ item, onClick = () => {} }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.stripeWrapper}>
      <Text style={styles.stripeTxt}>{item?.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.stripeTxt}>&#8377; {item?.price}</Text>
        <TouchableOpacity
          onPress={() => {
            onClick();
          }}
          style={styles.striprBtn}
          activeOpacity={0.6}
        >
          <Text style={[styles.stripeTxt, { color: "white" }]}>Choose</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionStripe;

const styles = StyleSheet.create({
  stripeWrapper: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(5),
  },
  stripeTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(14),
  },
  striprBtn: {
    padding: scale(8),
    marginLeft: moderateScale(10),
    backgroundColor: colors.themeColor,
    borderRadius: scale(2),
  },
});
