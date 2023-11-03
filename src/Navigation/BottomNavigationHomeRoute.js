import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import HomeScreenIcons from "../Screens/HomeTabScreens/HomeScreenIcons";
import MainHome from "../Screens/HomeTabScreens/MainHome";
import ProductDetail from "../Screens/HomeTabScreens/ProductDetail";
import MessagesHome from "../Screens/MessageTabScreens/MessagesHome";
import Notification from "../Screens/HomeTabScreens/Notification";

const Stack = createNativeStackNavigator();
const BottomNavigationHomeRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenName.homeScreenIcons}
        component={HomeScreenIcons}
      />
      <Stack.Screen name={screenName.mainHome} component={MainHome} />
      <Stack.Screen name={screenName.messagesHome} component={MessagesHome} />
      <Stack.Screen name={screenName.notification} component={Notification} />
    </Stack.Navigator>
  );
};

export default BottomNavigationHomeRoute;
