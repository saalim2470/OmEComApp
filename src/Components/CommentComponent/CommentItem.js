import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import moment from "moment";
import { getUserUploadTime } from "../../Constants/Constant";

const CommentItem = ({ item }) => {
  return (
    <View style={styles.onlyRowStyle}>
      {item?.user?.profilePicturePath != null ? (
        <Avatar.Image
          source={{
            uri: `${baseURL}${serverImagePath}/${item?.user?.profilePicturePath}`,
          }}
          size={scale(25)}
        />
      ) : (
        <Avatar.Image
          source={{
            uri: defaultProfileImg,
          }}
          size={scale(25)}
        />
      )}
      <View
        style={{
          marginLeft: moderateScale(5),
          marginRight: moderateScale(15),
        }}
      >
        <Text
          style={styles.headingTxt}
        >{`${item?.user?.firstname} ${item?.user?.lastname}`}</Text>
        <Text style={styles.subTxt}>
          {moment(getUserUploadTime(item?.createdDate))
            .startOf("seconds")
            .fromNow()}
        </Text>
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
  },
  commentTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(11),
    marginBottom: verticalScale(8),
  },
  subTxt: {
    fontSize: scale(7.5),
    fontFamily: "Montserrat-Light",
  },
});
