import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import ImageViewer from "../ImageViewer";
import images from "../../Constants/images";
import colors from "../../Constants/colors";
import { StatusBar } from "expo-status-bar";
import ProfileImage from "../ProfileImage";

const NavigationProfile = () => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  console.log(userDetail);
  const navigation = useNavigation();
  const imgViewerData = [
    {
      uri:
        userDetail?.profilePicture != null || userDetail?.profilePicture != ""
          ? `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`
          : defaultProfileImg,
    },
  ];
  const [openImageViewer, setImageViewer] = useState(false);
  return (
    <ImageBackground
      style={{ backgroundColor: "#96EFFF" }}
      source={images.omLogo}
      resizeMode="contain"
    >
      {/* <StatusBar
        backgroundColor="#B4D4FF"
        translucent
        barStyle="dark-content"
      /> */}
      <Pressable
        onPress={() => {
          navigation.navigate(screenName.bottomNavigation, {
            screen: screenName.profileRoute,
          });
        }}
        style={styles.topProfileView}
      >
        <Pressable
          style={styles.sideMenuProfileIcon}
          onPress={() => setImageViewer(true)}
        >
          {userDetail?.profilePicture != null ?(
            <Image
              source={{
                uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
              }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={images.user}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Pressable>
        <Text
          style={styles.boldTxt}
        >{`${userDetail?.firstName} ${userDetail?.lastName}`}</Text>
        <Text style={[styles.txt, { marginVertical: verticalScale(5) }]}>
          {userDetail?.email}
        </Text>
        <View style={styles.topViewFollowingView}>
          <Text
            style={[
              styles.txt,
              {
                marginRight: moderateScale(20),
                fontSize: scale(13),
                fontFamily: "Montserrat-Bold",
              },
            ]}
          >
            <Text style={styles.boldTxt}>{userDetail?.totalFollowers}</Text>{" "}
            followers
          </Text>
          <Text
            style={[
              styles.txt,
              {
                fontSize: scale(13),
                fontFamily: "Montserrat-Bold",
              },
            ]}
          >
            <Text style={styles.boldTxt}>{userDetail?.totalFollowing}</Text>{" "}
            following
          </Text>
        </View>
      </Pressable>
      {/* for open image */}
      <ImageViewer
        visible={openImageViewer}
        setIsVisible={setImageViewer}
        imgData={imgViewerData}
      />
    </ImageBackground>
  );
};

export default NavigationProfile;

const styles = StyleSheet.create({
  topProfileView: {
    paddingLeft: moderateScale(15),
    marginTop: verticalScale(5),
    paddingBottom: verticalScale(10),
  },
  sideMenuProfileIcon: {
    width: scale(70),
    height: scale(70),
    marginBottom: verticalScale(5),
    borderRadius: 100,
    overflow: "hidden",
  },
  txt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(11),
  },
  boldTxt: {
    fontSize: moderateScale(15),
    fontFamily: "Montserrat-Bold",
    color: "black",
  },
  topViewFollowingView: {
    marginRight: moderateScale(30),
    marginTop: verticalScale(8),
    flexDirection: "row",
    alignItems: "center",
  },
});
