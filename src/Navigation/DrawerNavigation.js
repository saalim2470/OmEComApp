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

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: scale(280), backgroundColor: "#FFFFFF" },
        drawerItemStyle: { backgroundColor: "#FFFFFF" },
        swipeEnabled: false,
        drawerLabelStyle: {
          color: "#000000",
          marginLeft: moderateScale(-15),
          fontFamily: "Montserrat-Medium",
        },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name={screenName.bottomNavigation}
        component={BottomNavigation}
        options={{
          drawerLabel: "Home",

          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.homeIcon}
              style={{ width: scale(15), height: scale(15) }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={screenName.profile}
        component={Profile}
        options={{
          drawerLabel: "Profile",
          swipeEnabled: false,
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={images.userIcon}
              style={{ width: scale(15), height: scale(15) }}
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
              source={images.bookmarkIcon}
              style={{ width: scale(15), height: scale(15) }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
