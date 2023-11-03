import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Explore from "../NotUsedScreens/Explore";
import Feed from "../Screens/MainAppScreens/Feed";
import screenName from "../Constants/screenName";
import colors from "../Constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const TopTab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.themeColor,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Medium",
          fontSize: scale(10),
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.themeColor,
        },
        tabBarStyle: {
          marginHorizontal: moderateScale(10),
          elevation: 0,
        },
        tabBarItemStyle: {
          borderBottomWidth: 0.5,
        },
        swipeEnabled: false,
      }}
    >
      <TopTab.Screen name={screenName.explore} component={Explore} />
      <TopTab.Screen name={screenName.feed} component={Feed} />
    </TopTab.Navigator>
  );
};

export default TopNavigation;
