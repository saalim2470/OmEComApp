import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";

const CommentItem = ({ item }) => {
  return (
    <View style={styles.onlyRowStyle}>
      {item?.user?.profilePicturePath != null ? (
        <Avatar.Image
          source={{
            uri: `${baseURL}${serverImagePath}/${item?.user?.profilePicturePath}`,
          }}
          size={scale(30)}
        />
      ) : (
        <Avatar.Image
          source={{
            uri: defaultProfileImg,
          }}
          size={scale(30)}
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
        <Text style={styles.commentTxt}>{item?.description}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(11),
  },
  onlyRowStyle: {
    flexDirection: "row",
    // alignItems: "center",
  },
  commentTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
    marginBottom: verticalScale(8),
  },
});
