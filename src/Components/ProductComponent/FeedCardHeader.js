import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { getOtherUserInfoApi } from "../../store/profileSlices/GetContentByUserId";
// import moment from "moment";
import { timeFormat } from "../../Constants/Constant";
import moment from 'moment-timezone';

const FeedCardHeader = ({ itemData }) => {
  const timeFormat=(time)=>{
    const localTimeZone = 'Asia/Taipei';
    const localMoment = moment.tz(time, localTimeZone);
    const utcMoment = localMoment.utc();
    console.log('-=-=-tume utc-=-=',utcMoment);
    return utcMoment
  }
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetail = useSelector((state) => state.login?.userDetail);
  const onClickHeader = () => {
    navigation.navigate(screenName.otherUserProfile);
    dispatch(getOtherUserInfoApi(itemData?.user?.id));
  };
  const onClickCurrentUser = () => {
    navigation.navigate(screenName.bottomNavigation, {
      screen: screenName.profileRoute,
      params: {
        screen: screenName.profile,
      },
    });
  };
  return (
    <Pressable
      onPress={() => {
        itemData?.user?.id === userDetail?.userId
          ? onClickCurrentUser()
          : onClickHeader();
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
            <Text style={styles.subTxt}>
              {moment(itemData?.createdDate).startOf('hour').fromNow()}
              {/* {timeFormat(itemData?.createdDate)} */}
            </Text>
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
  subTxt: {
    fontSize: scale(9.5),
    fontFamily: "Montserrat-Light",
  },
});
