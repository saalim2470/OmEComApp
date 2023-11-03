import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Search from "../Screens/SearchTabScreens/Search";
import SearchResultScreen from "../Screens/SearchTabScreens/SearchResultScreen";

const Stack = createNativeStackNavigator();
const BottomNavigationSearchRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.search} component={Search} />
      <Stack.Screen
        name={screenName.searchResultScreen}
        component={SearchResultScreen}
      />
    </Stack.Navigator>
  );
};

export default BottomNavigationSearchRoute;
