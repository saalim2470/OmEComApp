import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import WebView from "react-native-webview";
import { subcriptionType } from "../../Constants/Constant";

const SubscriptionDesc = ({ subsType }) => {
  return (
    <View style={{ marginHorizontal: moderateScale(8), flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>{subcriptionType[subsType]}</Text>
        {/* <WebView
        source={{ html: "<p><strong>rhghh yfdhfhdgf&nbsp;</strong></p><p>©grgrrggr™</p>" }}
        minimumFontSize={40}
        containerStyle={{
          marginHorizontal: moderateScale(20),
          paddingBottom: verticalScale(5),
        }}
      /> */}
      </View>
    </View>
  );
};

export default SubscriptionDesc;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(15),
    marginBottom: verticalScale(5),
  },
});
