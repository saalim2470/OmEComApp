import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import HomeScreenIcons from "../Screens/HomeTabScreens/HomeScreenIcons";
import screenName from "../Constants/screenName";
import colors from "../Constants/colors";
import { Image } from "react-native";
import images from "../Constants/images";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CustomSidebarMenu from "../Components/CustomeSidebarMenu";
import Profile from "../Screens/ProfileTabScreens/Profile";
import BookmarkScreen from "../Screens/HomeTabScreens/BookmarkScreen";
import Subscription from "../Screens/DrawerScreen/Subscription";
import { useRef } from "react";
import TermsAndCondition from "../Screens/DrawerScreen/TermsAndCondition";
import AboutUs from "../Screens/DrawerScreen/AboutUs";
import HomeScreen from "../Screens/DrawerScreen/HomeScreen";
import ReferToFriend from "../Screens/DrawerScreen/ReferToFriend";
import PlayStoreRating from "../Screens/DrawerScreen/PlayStoreRating";
import PrivacyPolicy from "../Screens/DrawerScreen/PrivacyPolicy";
import HomeBottomNavigation from "./HomeBottomNavigation";
import CategoryBottomNavigation from "./CategoryBottomNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const drawerRef = useRef(null);
  const closeDrawer = () => {
    drawerRef.current && drawerRef.current.closeDrawer(); // Close Drawer
  };
  return (
    <Drawer.Navigator
      ref={drawerRef}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: scale(280), backgroundColor: "#FFFFFF" },
        drawerItemStyle: { backgroundColor: "#FFFFFF" },
        // swipeEnabled: false,
        drawerLabelStyle: {
          color: "#000000",
          marginLeft: moderateScale(-15),
          fontFamily: "Montserrat-Bold",
          fontSize: scale(13),
        },
      }}
      // initialRouteName={screenName.homeScreen}
      drawerContent={(props) => (
        <CustomSidebarMenu {...props} closeDrawer={closeDrawer} />
      )}
    >
      <Drawer.Screen
        name={screenName.homeBottomNavigation}
        component={HomeBottomNavigation}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.drawerHome}
              style={{ width: scale(30), height: scale(30) }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.bottomNavigation}
        component={BottomNavigation}
        options={{
          drawerLabel: "Categories",
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.categories}
              style={{ width: scale(28), height: scale(28) }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Drawer.Screen
        name={screenName.bookmarkScreen}
        component={BookmarkScreen}
        options={{
          drawerLabel: "Saved Item",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.savedIcon}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.subscription}
        component={Subscription}
        options={{
          drawerLabel: "Subscription",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.subscription}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.termsAndCondition}
        component={TermsAndCondition}
        options={{
          drawerLabel: "Terms & Condition",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.terms}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.aboutUs}
        component={AboutUs}
        options={{
          drawerLabel: "About us",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.aboutIcon}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.playStoreRating}
        component={PlayStoreRating}
        options={{
          drawerLabel: "PlayStore Rating",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.playstore}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.privacyPolicy}
        component={PrivacyPolicy}
        options={{
          drawerLabel: "Privacy Policy",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.privacy}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
