import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Introduction from "../Screens/AuthScreens/Introduction";
import Splash from "../Screens/AuthScreens/Splash";
import DrawerNavigation from "./DrawerNavigation";
import ProductDetail from "../Screens/HomeTabScreens/ProductDetail";
import Mpin from "../Screens/AuthScreens/Mpin";
import MessageChatScreen from "../Screens/HomeTabScreens/MessageChatScreen";
import AddProductImage from "../Screens/PostScreen/AddProductImage";
import PostCategory from "../Screens/PostScreen/PostCategory";
import ItemDetail from "../Screens/PostScreen/ItemDetail";
import ProductPreview from "../Screens/PostScreen/ProductPreview";
import Notification from "../Screens/HomeTabScreens/Notification";
import AuthRoute from "./AuthRoute";
import Login from "../Screens/AuthScreens/Login";
import CreateAccount from "../Screens/AuthScreens/CreateAccount";
import Payment from "../Screens/Payment/Payment";
import PostData from "../Screens/PostScreen/PostData";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessToken } from "../Constants/defaults";
import { getCountryData } from "../store/contrySlices/GetCountrySlice";
import { useDispatch } from "react-redux";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Routes = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        console.log("-=-=-=in ready app");
        dispatch(getCountryData(1, 10));
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  (async function () {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("-=-=-app ready");
    }
  })();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.splash}
      // initialRouteName={"PostData"}
    >
      {/* Auth screens */}
      <Stack.Screen name={screenName.splash} component={Splash} />
      <Stack.Screen name={screenName.introduction} component={Introduction} />
      <Stack.Screen name={screenName.authRoute} component={AuthRoute} />
      <Stack.Screen
        name={screenName.drawerNavigation}
        component={DrawerNavigation}
      />
      <Stack.Screen name={screenName.productDetail} component={ProductDetail} />
      <Stack.Screen name={screenName.mPin} component={Mpin} />
      <Stack.Screen
        name={screenName.messageChatScreen}
        component={MessageChatScreen}
      />
      <Stack.Screen
        name={screenName.addProductImage}
        component={AddProductImage}
      />
      <Stack.Screen name={screenName.postCategory} component={PostCategory} />
      <Stack.Screen name={screenName.itemDetail} component={ItemDetail} />
      <Stack.Screen
        name={screenName.productPreview}
        component={ProductPreview}
      />
      <Stack.Screen name={screenName.notification} component={Notification} />
      <Stack.Screen name={"Payment"} component={Payment} />
      <Stack.Screen name={"PostData"} component={PostData} />
    </Stack.Navigator>
  );
};

export default Routes;
