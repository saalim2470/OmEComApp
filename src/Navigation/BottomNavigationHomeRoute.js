import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import HomeScreenIcons from "../Screens/HomeTabScreens/HomeScreenIcons";
// import MainHome from "../Screens/HomeTabScreens/MainHome";
import MyAds from "../Screens/DrawerScreen/MyAds";
import OtherUserProfile from "../Screens/HomeTabScreens/OtherUserProfile";
import HomeScreen from "../Screens/DrawerScreen/HomeScreen";
import Loading from "../Components/Loading";

const MainHome = React.lazy(() => import("../Screens/HomeTabScreens/MainHome"));
const Stack = createNativeStackNavigator();
const BottomNavigationHomeRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
      initialRouteName={screenName.homeScreen}
      
     
    >
      <Stack.Screen name={screenName.homeScreen} component={HomeScreen}/>
      <Stack.Screen
        name={screenName.homeScreenIcons}
        component={HomeScreenIcons}
      />
      <Stack.Screen name={screenName.mainHome}>
        {() => (
          <Suspense fallback={<Loading/>}>
            <MainHome />
          </Suspense>
        )}
      </Stack.Screen>
      {/* <Stack.Screen name={screenName.mainHome} component={MainHome} /> */}
      <Stack.Screen
        name={screenName.otherUserProfile}
        component={OtherUserProfile}
      />
    </Stack.Navigator>
  );
};

export default BottomNavigationHomeRoute;
