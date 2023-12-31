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
import { accessToken, userDetail } from "../Constants/defaults";
import { getCountryData } from "../store/contrySlices/GetCountrySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  setAccessToken,
  setuserDetail,
} from "../store/authSlices/LoginSlice";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Routes = () => {
  const dispatch = useDispatch();
  const countryData = useSelector((state) => state.getCountry.countryData);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const accessToken = useSelector((state) => state.login.accessToken);
  useEffect(() => {
    async function prepare() {
      try {
        dispatch(getCountryData(1, 50));
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token);
        if (!token) {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem(userDetail);
          setIsToken(false);
        } else {
          dispatch(setAccessToken(token));
          console.log(token);
          await getUserInfo();
          setIsToken(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  (async function () {
    if (appIsReady && countryData != null && countryData?.Success) {
      await SplashScreen.hideAsync();
    }
  })();
  const getUserInfo = async () => {
    try {
      const data = await AsyncStorage.getItem(userDetail);
      const data1 = JSON.parse(data);
      dispatch(setuserDetail(data1));
    } catch (e) {
      // error reading value
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="Location"
    >
      {/* <Stack.Screen name={screenName.splash} component={Splash} /> */}
      {accessToken == null ? (
        <>
          {/* <Stack.Screen name={screenName.introduction} component={Introduction} /> */}

          <Stack.Screen name={screenName.authRoute} component={AuthRoute} />
        </>
      ) : (
        <>
          {/* <Stack.Screen name={"Location"} component={Location} /> */}
          <Stack.Screen
            name={screenName.drawerNavigation}
            component={DrawerNavigation}
          />
          <Stack.Screen
            name={screenName.productDetail}
            component={ProductDetail}
          />
          <Stack.Screen name={screenName.mPin} component={Mpin} />
          <Stack.Screen
            name={screenName.messageChatScreen}
            component={MessageChatScreen}
          />
          <Stack.Screen
            name={screenName.addProductImage}
            component={AddProductImage}
          />
          {/* <Stack.Screen
            name={screenName.postCategory}
            component={PostCategory}
          /> */}
          <Stack.Screen name={screenName.itemDetail} component={ItemDetail} />
          <Stack.Screen
            name={screenName.productPreview}
            component={ProductPreview}
          />
          <Stack.Screen
            name={screenName.notification}
            component={Notification}
          />
          <Stack.Screen name={"Payment"} component={Payment} />
          <Stack.Screen name={screenName.postData} component={PostData} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
