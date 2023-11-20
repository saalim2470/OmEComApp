import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import screenName from "../../Constants/screenName";
import colors from "../../Constants/colors";
import SubscriptionBottomSheet from "../../Components/SubscriptionBottomSheet";

const Subscription = ({ navigation }) => {
  const getStripe = (month, price) => {
    return (
      <View style={styles.stripeWrapper}>
        <Text style={styles.stripeTxt}>{month}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.stripeTxt}>&#8377; {price}</Text>
          <TouchableOpacity style={styles.striprBtn} activeOpacity={0.6}>
            <Text style={[styles.stripeTxt, { color: "white" }]}>Choose</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader
        leftIcon={<Feather name="menu" size={scale(30)} color="black" />}
        middleIcon={images.omLogo}
        rightIcon={
          <Ionicons
            name="notifications-outline"
            size={scale(30)}
            color="black"
          />
        }
        onClickRightIcon={() => {
          navigation.navigate(screenName.notification);
        }}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>Inner Ads</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.headingBtnTxt}>Read More...</Text>
        </TouchableOpacity>
      </View>
      {getStripe("1 Month", "1200")}
      {getStripe("3 Month", "3000")}
      {getStripe("6 Month", "5400")}
      {getStripe("12 Month", "8400")}
      {getStripe("10 Days", "500")}
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>Home page/Front page Ad</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.headingBtnTxt}>Read More...</Text>
        </TouchableOpacity>
      </View>
      {getStripe("1 Month", "13000")}
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>Pin Post</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.headingBtnTxt}>Read More...</Text>
        </TouchableOpacity>
      </View>
      {getStripe("1 Week", "4800")}
      {getStripe("1 Month", "14400")}
      {/* <SubscriptionBottomSheet /> */}
    </SafeAreaView>
  );
};

export default Subscription;

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
