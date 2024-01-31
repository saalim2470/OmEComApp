import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import images from "../Constants/images";
import { Divider, Menu } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../Constants/defaults";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/authSlices/LoginSlice";
import { useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";
import { resetUserAdContent } from "../store/profileSlices/GetUserContentSlice";
import CustomeAlert from "./CustomeAlert";
import NavigationProfile from "./NavigationComponents/NavigationProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { onShare } from "../Constants/Constant";

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
      <NavigationProfile />
      {/* <Divider
        bold={true}
        style={{ backgroundColor: "black", marginTop: verticalScale(15) }}
      /> */}
      <DrawerContentScrollView {...props}>
        <View style={{ marginTop: verticalScale(-20) }}>
          {/* <DrawerItemList {...props} /> */}

          <DrawerItem
            label="Home"
            onPress={() => {
              navigation.navigate(screenName.bottomNavigation, {
                screen: screenName.bottomNavigationHomeRoute,
                params: {
                  screen: screenName.homeScreen,
                },
              });
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.drawerHome}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />

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
                source={images.categories}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />

          <DrawerItem
            label="Saved Item"
            onPress={() => {
              navigation.navigate(screenName.bookmarkScreen);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.savedIcon}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="Subscription"
            onPress={() => {
              navigation.navigate(screenName.subscription, {
                adsType: "all",
              });
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.subscription}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="Terms & Condition"
            onPress={() => {
              navigation.navigate(screenName.termsAndCondition);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.terms}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="About us"
            onPress={() => {
              navigation.navigate(screenName.aboutUs);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.aboutIcon}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="PlayStore Rating"
            onPress={() => {
              navigation.navigate(screenName.playStoreRating);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.playstore}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="Privacy Policy"
            onPress={() => {
              navigation.navigate(screenName.privacyPolicy);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.privacy}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="Promotion"
            onPress={() => {
              navigation.navigate(screenName.profileRoute);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.promotion}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />

          <DrawerItem
            label="Refer to friend"
            onPress={() => {
              onShare();
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.refer}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />

          <DrawerItem
            label="My Ads"
            onPress={() => {
              navigation.navigate(screenName.myAds);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.announcmentIcon}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
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
                source={images.userFillIcon}
                tintColor={"#527853"}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
          <DrawerItem
            label="Contact Us"
            onPress={() => {
              navigation.navigate(screenName.contactUs);
            }}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.contact_us}
                style={{ width: scale(30), height: scale(30) }}
                resizeMode="contain"
              />
            )}
          />
        </View>
      </DrawerContentScrollView>
      <Divider bold={true} style={{ backgroundColor: "black" }} />
      <DrawerItem
        label="Log out"
        onPress={() => {
          openMenu();
        }}
        labelStyle={styles.labelStyle}
        icon={({ color, size, focused }) => (
          <Image
            source={images.logoutIcon}
            style={{ width: scale(30), height: scale(30) }}
            resizeMode="contain"
          />
        )}
      />
      <View
        style={{
          marginBottom: verticalScale(5),
          marginLeft: moderateScale(15),
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            color: "#000000",
            fontSize: scale(13),
            textAlign: "center",
          }}
        >
          Version 1.0.015
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
    fontFamily: "Montserrat-Bold",
    fontSize: scale(13),
    color: "#000000",
    marginLeft: moderateScale(-15),
  },
});

export default CustomSidebarMenu;
