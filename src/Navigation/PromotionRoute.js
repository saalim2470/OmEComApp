import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Promotion from "../Screens/DrawerScreen/Promotion";
import UploadPromotionAds from "../Screens/DrawerScreen/UploadPromotionAds";

const Stack = createNativeStackNavigator();
const PromotionRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.promotion} component={Promotion} />
      <Stack.Screen
        name={screenName.uploadPromotionAds}
        component={UploadPromotionAds}
      />
    </Stack.Navigator>
  );
};

export default PromotionRoute;
