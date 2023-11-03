import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Message from "../Screens/MessageTabScreens/Message";
import Profile from "../Screens/ProfileTabScreens/Profile";
import screenName from "../Constants/screenName";
import { Image, StyleSheet, View } from "react-native";
import images from "../Constants/images";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import colors from "../Constants/colors";
import BottomNavigationHomeRoute from "./BottomNavigationHomeRoute";
import Search from "../Screens/SearchTabScreens/Search";
import PostItem from "../Screens/PostScreen/PostItem";
import MessagesHome from "../Screens/MessageTabScreens/MessagesHome";
import BottomNavigationSearchRoute from "./BottomNavigationSearchRoute";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: verticalScale(50) },
        tabBarActiveTintColor: colors.themeColor,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={screenName.bottomNavigationHomeRoute}
        component={BottomNavigationHomeRoute}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={images.homeFillIcon}
                style={[styles.iconStyle, { tintColor: color }]}
              />
            ) : (
              <Image source={images.homeIcon} style={styles.iconStyle} />
            ),
        }}
      />
      <Tab.Screen
        name={screenName.bottomNavigationSearchRoute}
        component={BottomNavigationSearchRoute}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={images.searchIcon}
              style={[styles.iconStyle, { tintColor: focused ? color : null }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenName.postItem}
        component={PostItem}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                elevation: 10,
                top: verticalScale(-15),
              }}
            >
              <Image
                source={images.plusIcon}
                style={{
                  width: scale(50),
                  height: scale(50),
                  tintColor: colors.themeColor,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={screenName.message}
        component={MessagesHome}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={images.emailIcon}
              style={[styles.iconStyle, { tintColor: focused ? color : null }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenName.profile}
        component={Profile}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={images.userFillIcon}
                style={[styles.iconStyle, { tintColor: color }]}
              />
            ) : (
              <Image source={images.userIcon} style={styles.iconStyle} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
});
