import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar } from "react-native-paper";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import { useDispatch } from "react-redux";
import { getOtherUserInfoApi } from "../../store/profileSlices/GetContentByUserId";

const FeedCardHeader = ({ itemData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(screenName.otherUserProfile);
        dispatch(getOtherUserInfoApi(itemData?.user?.id));
      }}
    >
      <View style={styles.cardHeaderView}>
        <View style={styles.onlyRowStyle}>
          {itemData?.user?.profilePicturePath != null ||
          itemData?.user?.profilePicturePath != "" ? (
            <Avatar.Image
              source={{
                uri: `${baseURL}${serverImagePath}/${itemData?.user?.profilePicturePath}`,
              }}
              size={scale(35)}
            />
          ) : (
            <Avatar.Image
              source={{
                uri: defaultProfileImg,
              }}
              size={scale(35)}
            />
          )}
          <View style={{ marginLeft: moderateScale(5) }}>
            <Text
              style={styles.headingTxt}
            >{`${itemData?.user?.firstname} ${itemData?.user?.lastname}`}</Text>
            {/* <Text style={styles.subTxt}>
          {itemData?.location?.length > 50
            ? `${itemData?.location?.substring(0, 50)}.....`
            : itemData?.location}
        </Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default FeedCardHeader;

const styles = StyleSheet.create({
  cardHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headingTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(11),
  },
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
