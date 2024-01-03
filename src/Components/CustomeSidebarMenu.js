import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import images from "../Constants/images";
import { Divider, Menu } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  accessToken,
  baseURL,
  defaultProfileImg,
  serverImagePath,
  userDetail,
} from "../Constants/defaults";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/authSlices/LoginSlice";
import { StackActions, useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";
import { resetUserAdContent } from "../store/profileSlices/GetUserContentSlice";
import CustomeAlert from "./CustomeAlert";

const CustomSidebarMenu = (props) => {
  const navigation = useNavigation();
  const userDetail = useSelector((state) => state.login?.userDetail);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const logout = async () => {
    try {
      dispatch(logOut());
      dispatch(resetUserAdContent());
      await AsyncStorage.removeItem(accessToken);
      await AsyncStorage.removeItem(userDetail);
    } catch (error) {}
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topProfileView}>
          <View style={styles.sideMenuProfileIcon}>
            {userDetail?.profilePicture != null ||
            userDetail?.profilePicture != "" ? (
              <Image
                source={{
                  uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
                }}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                source={{
                  uri: defaultProfileImg,
                }}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <Text
            style={styles.boldTxt}
          >{`${userDetail?.firstName} ${userDetail?.lastName}`}</Text>
          <Text style={[styles.txt, { marginVertical: verticalScale(5) }]}>
            {userDetail?.email}
          </Text>
          <View style={styles.topViewFollowingView}>
            <Text style={[styles.txt, { marginRight: moderateScale(20) }]}>
              <Text style={styles.boldTxt}>00</Text> followers
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.boldTxt}>00</Text> following
            </Text>
          </View>
        </View>
        <Divider style={{ marginTop: verticalScale(15) }} />
        <View style={{ marginTop: verticalScale(20) }}>
          <DrawerItemList {...props} />

          <DrawerItem
            label="Categories"
            onPress={() => {
              navigation.navigate(screenName.bottomNavigation, {
                screen: screenName.bottomNavigationHomeRoute,
                params: {
                  screen: screenName.homeScreenIcons,
                },
              });
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.homeIcon}
                style={{ width: scale(15), height: scale(15) }}
              />
            )}
          />

          <DrawerItem
            label="My Ads"
            onPress={() => {
              navigation.navigate(screenName.bottomNavigation, {
                screen: screenName.bottomNavigationHomeRoute,
                params: {
                  screen: screenName.myAds,
                },
              });
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.announcmentIcon}
                style={{ width: scale(15), height: scale(15) }}
              />
            )}
          />
          <DrawerItem
            label="Profile"
            onPress={() => {
              navigation.navigate(screenName.bottomNavigation, {
                screen: screenName.profileRoute,
              });
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.userIcon}
                style={{ width: scale(15), height: scale(15) }}
              />
            )}
          />
        </View>
      </DrawerContentScrollView>
      <Divider />
      <DrawerItem
        label="Log out"
        onPress={() => {
          openMenu();
        }}
        labelStyle={styles.labelStyle}
        icon={({ color, size, focused }) => (
          <Image
            source={images.logoutIcon}
            style={{ width: scale(15), height: scale(15) }}
          />
        )}
      />
      <View
        style={{
          marginBottom: verticalScale(5),
          marginLeft: moderateScale(15),
        }}
      >
        <Text style={{ fontFamily: "Montserrat-Medium", color: "#000000" }}>
          Version 1.0.008
        </Text>
      </View>
      <CustomeAlert
        show={visible}
        title={"Log out"}
        msg={"Are you sure you want to logout?"}
        onDismiss={() => closeMenu()}
        onCliCkOk={() => {
          logout();
          closeMenu();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: scale(70),
    height: scale(70),
    marginBottom: verticalScale(5),
    borderRadius: 100,
    overflow: "hidden",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(8),
  },
  txt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(11),
  },
  boldTxt: {
    fontSize: moderateScale(15),
    fontFamily: "Montserrat-Bold",
  },
  topProfileView: {
    paddingLeft: moderateScale(15),
  },
  topViewFollowingView: {
    marginRight: moderateScale(30),
    marginTop: verticalScale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  labelStyle: {
    fontFamily: "Montserrat-Medium",
    color: "#000000",
    marginLeft: moderateScale(-15),
  },
});

export default CustomSidebarMenu;
