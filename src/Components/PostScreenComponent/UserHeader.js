import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const UserHeader = () => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  return (
    <View style={styles.userView}>
      <Avatar.Image
        source={{
          uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
        }}
        size={scale(45)}
      />
      <View style={{ marginLeft: moderateScale(5) }}>
        <Text
          style={styles.headingTxt}
        >{`${userDetail?.firstName} ${userDetail?.lastName}`}</Text>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(16),
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    marginTop: verticalScale(5),
  },
});
