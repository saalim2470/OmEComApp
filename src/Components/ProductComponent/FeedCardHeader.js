import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { memo} from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import ProfileName from "../ProfileName";

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
          <ProfileImage
            url={itemData?.user?.profilePicturePath}
            size={scale(35)}
          />
       
          <ProfileName data={itemData}/>
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
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
