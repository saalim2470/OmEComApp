import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../Constants/colors";

const NotificationCard = () => {
  return (
    <View style={styles.notificationCard}>
      <View style={styles.notificationLeftView}>
        <Avatar.Image
          size={scale(45)}
          style={{ marginRight: moderateScale(7) }}
          source={{
            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
          }}
        />
        <Text style={styles.notificationTxt}>
          50% OFF in Ultraboost All Terrain Ltd Shoes!
        </Text>
      </View>
      <View style={styles.notificationRightView}>
        <Text style={styles.notificationTimeTxt}>9:35 AM</Text>
        <View style={styles.notificationCircle}></View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(7),
    paddingHorizontal: moderateScale(12),
    marginBottom: verticalScale(5),
  },
  notificationLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationRightView: {
    alignSelf: "flex-start",
  },
  notificationTxt: {
    width: scale(210),
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
    lineHeight: 18,
  },
  notificationTimeTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
  },
  notificationCircle: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    alignSelf: "flex-end",
    marginTop: verticalScale(5),
    backgroundColor: colors.themeColor,
  },
});
