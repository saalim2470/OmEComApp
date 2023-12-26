import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Profile from "../Screens/ProfileTabScreens/Profile";
import EditProfile from "../Screens/ProfileTabScreens/EditProfile";

const Stack = createNativeStackNavigator();
const BottomNavigationProfileRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.profile} component={Profile} />
      <Stack.Screen name={screenName.editProfile} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default BottomNavigationProfileRoute;
