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
import images from "../../Constants/images";
import ProfileImage from "../ProfileImage";

const UserHeader = ({ userLocation, onCLickHeaderLocation = () => {} }) => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  return (
    <View style={styles.userView}>
      <ProfileImage url={userDetail?.profilePicture} size={scale(45)}/>
    
      <View style={{ marginHorizontal: moderateScale(5), flex: 1 }}>
        {!userLocation ? (
          <Text style={styles.headingTxt}>
            {`${userDetail?.firstName} ${userDetail?.lastName}`}
          </Text>
        ) : (
          <Text
            style={styles.headingTxt}
            onPress={() => {
              onCLickHeaderLocation();
            }}
          >
            {`${userDetail?.firstName} ${userDetail?.lastName} - at ${userLocation?.text}`}
          </Text>
        )}
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
