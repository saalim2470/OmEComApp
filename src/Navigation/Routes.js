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
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Routes = () => {
  const dispatch = useDispatch();
  const countryData = useSelector((state) => state.getCountry.countryData);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isToken, setIsToken] = useState(false);
  console.log("-=-=--is token before-=-=", isToken);
  useEffect(() => {
    async function prepare() {
      try {
        dispatch(getCountryData(1, 10));
        const token = await AsyncStorage.getItem(accessToken);
        if (token != "" && token != null) {
          setIsToken(true);
        } else {
          setIsToken(false);
        }
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
    if (appIsReady && countryData != null && countryData?.Success) {
      await SplashScreen.hideAsync();
      console.log("-=-=-app ready");
      console.log("-=-=--is token after-=-=", isToken);
    }
  })();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isToken ? screenName.drawerNavigation : screenName.authRoute
      }
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
      <Stack.Screen name={screenName.postData} component={PostData} />
    </Stack.Navigator>
  );
};

export default Routes;
