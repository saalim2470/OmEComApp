import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
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
import moment from "moment";
import { getUserUploadTime } from "../../Constants/Constant";
import images from "../../Constants/images";

const FeedCardHeader = ({ itemData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetail = useSelector((state) => state.login?.userDetail);
  const onClickHeader = () => {
    navigation.navigate(screenName.otherUserProfile, {
      userId: itemData?.user?.id,
    });
    // dispatch(getOtherUserInfoApi(itemData?.user?.id));
  };
  const onClickCurrentUser = () => {
    navigation.navigate(screenName.bottomNavigation, {
      screen: screenName.profileRoute,
      params: {
        screen: screenName.profile,
      },
    });
  };
  const openMap = () => {
    const latitude = itemData?.lat;
    const longitude = itemData?.lon;
    const label = itemData?.placeName;

    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          "https://www.google.de/maps/@" +
          latitude +
          "," +
          longitude +
          "?q=" +
          label;
        return Linking.openURL(browser_url);
      }
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
          {itemData?.user?.profilePicturePath != null ? (
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
          <View style={{ marginLeft: moderateScale(5), flex: 1 }}>
            {itemData?.placeName ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Text style={styles.headingTxt}>
                  {`${itemData?.user?.firstname} ${itemData?.user?.lastname}`}
                </Text>
                <Text
                  style={[
                    {
                      marginRight: moderateScale(5),
                      fontFamily: "Montserrat-Light",
                      fontSize: moderateScale(15),
                    },
                  ]}
                >
                  - is at
                </Text>
                <TouchableOpacity
                  // onPress={() => openMap()}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: verticalScale(5),
                  }}
                >
                  <Image
                    source={images.location}
                    resizeMode="contain"
                    style={{
                      width: scale(15),
                      height: scale(13),
                      marginRight: moderateScale(2),
                    }}
                  />
                  <Text
                    style={[styles.headingTxt, { fontSize: moderateScale(15) }]}
                  >
                    {`${itemData?.placeName}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.headingTxt}>
                {`${itemData?.user?.firstname} ${itemData?.user?.lastname}`}
              </Text>
            )}
            <Text style={styles.subTxt}>
              {moment(getUserUploadTime(itemData?.createdDate))
                .startOf("seconds")
                .fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(FeedCardHeader);

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
    fontSize: moderateScale(15),
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
