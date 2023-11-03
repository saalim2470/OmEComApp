import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/AuthScreens/Login";
import ForgotPassword from "../Screens/AuthScreens/ForgotPassword";
import ResetPassword from "../Screens/AuthScreens/ResetPassword";
import CreateAccount from "../Screens/AuthScreens/CreateAccount";
import screenName from "../Constants/screenName";
import Verification from "../Screens/AuthScreens/Verification";
import CheckEmail from "../Screens/AuthScreens/CheckEmail";
import Introduction from "../Screens/AuthScreens/Introduction";
import Splash from "../Screens/AuthScreens/Splash";
import SuggestFriend from "../NotUsedScreens/SuggestFriend";
import TellUsAboutLooksLike from "../NotUsedScreens/TellUsAboutLooksLike";
import TellUsAboutTags from "../NotUsedScreens/TellUsAboutTags";
import TellUsAboutSize from "../NotUsedScreens/TellUsAboutSize";
import SuggestStore from "../NotUsedScreens/SuggestStore";
import HomeScreen from "../NotUsedScreens/HomeScreen";
import SearchResultScreen from "../Screens/SearchTabScreens/SearchResultScreen";
import DrawerNavigation from "./DrawerNavigation";
import ProductDetail from "../Screens/HomeTabScreens/ProductDetail";
import Mpin from "../Screens/AuthScreens/Mpin";
import MessageChatScreen from "../Screens/HomeTabScreens/MessageChatScreen";
import AddProductImage from "../Screens/PostScreen/AddProductImage";
import PostCategory from "../Screens/PostScreen/PostCategory";
import ItemDetail from "../Screens/PostScreen/ItemDetail";
import ProductPreview from "../Screens/PostScreen/ProductPreview";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavigationHomeRoute from "./BottomNavigationHomeRoute";
import images from "../Constants/images";
import Search from "../Screens/SearchTabScreens/Search";
import PostItem from "../Screens/PostScreen/PostItem";
import colors from "../Constants/colors";
import MessagesHome from "../Screens/MessageTabScreens/MessagesHome";
import Profile from "../Screens/ProfileTabScreens/Profile";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.splash}
    >
      {/* Auth screens */}
      <Stack.Screen name={screenName.splash} component={Splash} />
      <Stack.Screen name={screenName.introduction} component={Introduction} />
      <Stack.Screen name={screenName.login} component={Login} />
      <Stack.Screen
        name={screenName.forgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen name={screenName.resetPassword} component={ResetPassword} />
      <Stack.Screen name={screenName.createAccount} component={CreateAccount} />
      <Stack.Screen name={screenName.verification} component={Verification} />
      <Stack.Screen name={screenName.checkEmail} component={CheckEmail} />
      {/* Main App Screens */}
      <Stack.Screen name={screenName.suggestFriend} component={SuggestFriend} />
      <Stack.Screen
        name={screenName.tellUsAboutLooksLike}
        component={TellUsAboutLooksLike}
      />
      <Stack.Screen
        name={screenName.tellUsAboutTags}
        component={TellUsAboutTags}
      />
      <Stack.Screen
        name={screenName.tellUsAboutSize}
        component={TellUsAboutSize}
      />
      <Stack.Screen name={screenName.suggestStore} component={SuggestStore} />
      <Stack.Screen
        name={screenName.drawerNavigation}
        component={DrawerNavigation}
      />
      {/* <Stack.Screen
        name={screenName.searchResultScreen}
        component={SearchResultScreen}
      /> */}
      <Stack.Screen name={screenName.productDetail} component={ProductDetail} />
      <Stack.Screen name={screenName.mPin} component={Mpin} />
      <Stack.Screen
        name={screenName.messageChatScreen}
        component={MessageChatScreen}
      />
      <Stack.Screen
        name={screenName.addProductImage}
        component={AddProductImage}
      />
      <Stack.Screen name={screenName.postCategory} component={PostCategory} />
      <Stack.Screen name={screenName.itemDetail} component={ItemDetail} />
      <Stack.Screen
        name={screenName.productPreview}
        component={ProductPreview}
      />
    </Stack.Navigator>
  );
};

export default Routes;

const authRoute = () => {
  <Stack.Navigator>
    <Stack.Screen name={screenName.introduction} component={Introduction} />
    <Stack.Screen name={screenName.login} component={Login} />
    <Stack.Screen name={screenName.forgotPassword} component={ForgotPassword} />
    <Stack.Screen name={screenName.resetPassword} component={ResetPassword} />
    <Stack.Screen name={screenName.createAccount} component={CreateAccount} />
    <Stack.Screen name={screenName.verification} component={Verification} />
    <Stack.Screen name={screenName.checkEmail} component={CheckEmail} />
  </Stack.Navigator>;
};
const bottomNavigation = () => {
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
      name={screenName.search}
      component={Search}
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
  </Tab.Navigator>;
};

const drawerNavigation = () => {};
const styles = StyleSheet.create({
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
});
