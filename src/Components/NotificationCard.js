import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import moment from "moment";
import { getUserUploadTime } from "../Constants/Constant";
import { useDispatch } from "react-redux";
import { getUserReadNotificationApi } from "../store/NotificationSlices/GetUserReadNotification";
import { useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../Constants/defaults";

const NotificationCard = ({ data, user }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onClickNotification = () => {
    dispatch(getUserReadNotificationApi(data?.id));
    navigation.navigate(screenName.productDetail, {
      contentId: data?.adContentId,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.notificationCard}
      onPress={() => {
        onClickNotification();
      }}
    >
      <View style={styles.notificationLeftView}>
        {user?.profilePicturePath != null ? (
          <Avatar.Image
            style={{ marginRight: moderateScale(7) }}
            source={{
              uri: `${baseURL}${serverImagePath}/${data?.user?.profilePicturePath}`,
            }}
            size={scale(45)}
          />
        ) : (
          <Avatar.Image
            style={{ marginRight: moderateScale(7) }}
            source={{
              uri: defaultProfileImg,
            }}
            size={scale(45)}
          />
        )}
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
