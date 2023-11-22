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
import Notification from "../Screens/HomeTabScreens/Notification";

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
      <Stack.Screen name={"Auth"} component={AuthRoute} />
      <Stack.Screen
        name={screenName.drawerNavigation}
        component={DrawerNavigation}
      />
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
      <Stack.Screen name={screenName.notification} component={Notification} />
    </Stack.Navigator>
  );
};

export default Routes;

const AuthRoute = () => {
  <Stack.Navigator>
    <Stack.Screen name={screenName.login} component={Login} />
    <Stack.Screen name={screenName.forgotPassword} component={ForgotPassword} />
    <Stack.Screen name={screenName.resetPassword} component={ResetPassword} />
    <Stack.Screen name={screenName.createAccount} component={CreateAccount} />
    <Stack.Screen name={screenName.verification} component={Verification} />
    <Stack.Screen name={screenName.checkEmail} component={CheckEmail} />
  </Stack.Navigator>;
};
