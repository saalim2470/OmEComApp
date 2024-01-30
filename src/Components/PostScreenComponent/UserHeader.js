import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";

const UserHeader = ({ userLocation }) => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  return (
    <View style={styles.userView}>
      {userDetail?.profilePicture !== "" ||
      userDetail?.profilePicture !== null ? (
        <Avatar.Image
          source={{
            uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
          }}
          size={scale(45)}
        />
      ) : (
        <Avatar.Image
          source={{
            uri: defaultProfileImg,
          }}
          size={scale(45)}
        />
      )}
      <View style={{ marginHorizontal: moderateScale(5), flex: 1 }}>
        <Text style={styles.headingTxt}>
          {!userLocation
            ? `${userDetail?.firstName} ${userDetail?.lastName}`
            : `${userDetail?.firstName} ${userDetail?.lastName} - at ${userLocation?.text}`}
        </Text>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(15),
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    marginTop: verticalScale(5),
  },
});
