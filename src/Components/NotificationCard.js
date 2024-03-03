import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import moment from "moment";
import { getUserUploadTime } from "../Constants/Constant";
import { useDispatch } from "react-redux";

const NotificationCard = ({ data }) => {
  const dispatch = useDispatch();
  const onClickNotification=()=>{
    dispatch(getUserReadNotificationApi(data?.id))
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.notificationCard}
      onPress={() => {
        onClickNotification();
      }}
    >
      <View style={styles.notificationLeftView}>
        <Avatar.Image
          size={scale(45)}
          style={{ marginRight: moderateScale(7) }}
          source={{
            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
          }}
        />
        <View>
          <Text
            style={[styles.notificationTxt, { fontFamily: "Montserrat-Bold" }]}
          >
            {data?.title}
          </Text>
          <Text style={styles.notificationTxt}>{data?.description}</Text>
        </View>
      </View>
      <View style={styles.notificationRightView}>
        <Text style={styles.notificationTimeTxt}>
          {moment(getUserUploadTime(data?.createdDate)).format(
            "DD-MM-YYYY",
            "m:s"
          )}
        </Text>
        {!data?.isRead && <View style={styles.notificationCircle}></View>}
      </View>
    </TouchableOpacity>
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
