import React, { useState } from "react";
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
import commonStyle from "../Constants/commonStyle";
import { Divider, Menu } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../Constants/defaults";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlices/LoginSlice";
import { StackActions, useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";

const CustomSidebarMenu = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const logout = async () => {
    try {
      dispatch(logOut());
      await AsyncStorage.removeItem(accessToken);
      navigation.dispatch(StackActions.replace(screenName.login));
    } catch (error) {}
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topProfileView}>
          <View style={styles.sideMenuProfileIcon}>
            <Image
              source={images.omLogo}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={styles.boldTxt}>Andrew Wade</Text>
          <Text style={[styles.txt, { marginVertical: verticalScale(5) }]}>
            elenarpenafashion@gmail.com
          </Text>
          <View style={styles.topViewFollowingView}>
            <Text style={[styles.txt, { marginRight: moderateScale(20) }]}>
              <Text style={styles.boldTxt}>4.8K </Text> followers
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.boldTxt}>2 </Text> following
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ position: "absolute", right: moderateScale(10) }}
          >
            <Image
              source={images.close_Icon}
              style={{
                tintColor: "grey",
                width: scale(20),
                height: scale(20),
              }}
            />
          </TouchableOpacity>
        </View>
        <Divider style={{ marginTop: verticalScale(15) }} />
        <View style={{ marginTop: verticalScale(20) }}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="My Ads"
            onPress={() => {}}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.announcmentIcon}
                style={{ width: scale(15), height: scale(15) }}
              />
            )}
          />
          {/* <DrawerItem
            label="Profile"
            onPress={() => {navigation.navigate()}}
            labelStyle={styles.labelStyle}
            icon={({ color, size, focused }) => (
              <Image
                source={images.userIcon}
                style={{ width: scale(15), height: scale(15) }}
              />
            )}
          /> */}
        </View>
      </DrawerContentScrollView>
      <Divider />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{ backgroundColor: "white" }}
        anchor={
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
        }
      >
        <Menu.Item
          onPress={() => {
            logout();
          }}
          title="Log out"
        />
      </Menu>
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
