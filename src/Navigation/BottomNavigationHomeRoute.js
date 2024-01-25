import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import HomeScreenIcons from "../Screens/HomeTabScreens/HomeScreenIcons";
import MainHome from "../Screens/HomeTabScreens/MainHome";
import MyAds from "../Screens/DrawerScreen/MyAds";
import OtherUserProfile from "../Screens/HomeTabScreens/OtherUserProfile";
import HomeScreen from "../Screens/DrawerScreen/HomeScreen";

const Stack = createNativeStackNavigator();
const BottomNavigationHomeRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.homeScreenIcons}
    >
      <Stack.Screen name={screenName.homeScreen} component={HomeScreen} />
      <Stack.Screen
        name={screenName.homeScreenIcons}
        component={HomeScreenIcons}
      />
      <Stack.Screen name={screenName.mainHome} component={MainHome} />
      <Stack.Screen name={screenName.myAds} component={MyAds} />
      <Stack.Screen
        name={screenName.otherUserProfile}
        component={OtherUserProfile}
      />
    </Stack.Navigator>
  );
};

export default BottomNavigationHomeRoute;
