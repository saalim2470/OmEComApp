import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Profile from "../Screens/ProfileTabScreens/Profile";
import EditProfile from "../Screens/ProfileTabScreens/EditProfile";
import { Text, View } from "react-native";
import Loading from "../Components/Loading";

const Stack = createNativeStackNavigator();
const ProfileScreen = React.lazy(() => import("../Screens/ProfileTabScreens/Profile"));
const BottomNavigationProfileRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name={screenName.profile}>
        {(props) => (
          <Suspense fallback={<Loading/>}>
            <ProfileScreen {...props}/>
          </Suspense>
        )}
      </Stack.Screen>
      {/* <Stack.Screen name={screenName.profile} component={Profile} /> */}
      <Stack.Screen name={screenName.editProfile} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default BottomNavigationProfileRoute;
