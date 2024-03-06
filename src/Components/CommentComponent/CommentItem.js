import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import moment from "moment";
import { getUserUploadTime } from "../../Constants/Constant";
import ProfileImage from "../ProfileImage";

const CommentItem = ({ item }) => {
  return (
    <View style={styles.onlyRowStyle}>
      <ProfileImage url={item?.user?.profilePicturePath} size={scale(30)} />
      <View
        style={{
          marginLeft: moderateScale(5),
          marginRight: moderateScale(15),
          flex: 1,
          gap: scale(5),
        }}
      >
        <View style={styles.profileNameView}>
          <Text
            style={styles.headingTxt}
          >{`${item?.user?.firstname} ${item?.user?.lastname}`}</Text>
          <Text style={styles.subTxt}>
            {moment(getUserUploadTime(item?.createdDate))
              .startOf("seconds")
              .fromNow()}
          </Text>
        </View>

        <Text style={styles.commentTxt}>{item?.description}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(10),
  },
  onlyRowStyle: {
    flexDirection: "row",
    // alignItems: "center",
    // borderWidth: 1,
    gap: scale(5),
  },
  commentTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(11),
    marginBottom: verticalScale(8),
  },
  subTxt: {
    fontSize: scale(7.5),
    fontFamily: "Montserrat-Light",
  },
  profileNameView: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
});
