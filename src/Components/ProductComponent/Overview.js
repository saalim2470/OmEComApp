import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../../Constants/colors";

const Overview = ({ itemData }) => {
  return (
    <View
      style={{
        marginTop: verticalScale(5),
      }}
    >
      <Text style={styles.bottomTxt("Montserrat-Bold")}>{itemData?.title}</Text>
      <View
        style={[
          styles.onlyRowStyle,
          {
            marginTop: verticalScale(8),
          },
        ]}
      >
        <Text style={styles.bottomTxt("Montserrat-Medium")}>
          Condition:{" "}
          <Text style={styles.bottomTxt("Montserrat-Bold")}>
            {itemData?.condition}
          </Text>
        </Text>
        <Text
          style={[
            styles.bottomTxt("Montserrat-Medium"),
            { marginLeft: moderateScale(10) },
          ]}
        >
          Brand:{" "}
          <Text style={styles.bottomTxt("Montserrat-Bold")}>
            {itemData?.brand}
          </Text>
        </Text>
      </View>
      {/* <View style={styles.onlyRowStyle}>
        <Text style={styles.bottomTxt("Montserrat-Medium")}>
          Size:{" "}
          <Text style={styles.bottomTxt("Montserrat-Bold")}>
            {itemData?.size.toUpperCase()}
          </Text>
        </Text>
        <Text
          style={[
            styles.bottomTxt("Montserrat-Medium"),
            { marginLeft: moderateScale(10) },
          ]}
        >
          Color:{" "}
          <Text style={styles.bottomTxt("Montserrat-Bold")}>
            {itemData?.color}
          </Text>
        </Text>
      </View> */}
      {/* price view */}
      <Text
        style={[
          styles.bottomTxt("Montserrat-Medium"),
          { marginTop: verticalScale(7) },
        ]}
      >
        Price:{" "}
        <Text
          style={[
            styles.bottomTxt("Montserrat-Bold"),
            { color: colors.themeColor },
          ]}
        >
          {itemData?.price}
        </Text>
      </Text>
      {/* short desc */}
      <Text
        style={[
          styles.bottomTxt("Montserrat-Light"),
          { marginVertical: verticalScale(10) },
        ]}
      >
        {itemData?.shorDescription}
      </Text>

      {/* long desc view */}
      <Text style={styles.bottomTxt("Montserrat-Light")}>
        {itemData?.description}
      </Text>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  bottomTxt: (fontFamily) => ({
    fontSize: scale(10),
    fontFamily: fontFamily,
  }),
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
