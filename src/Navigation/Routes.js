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
  getLoggedInUSerInfo,
  getUserInfo,
  setAccessToken,
  setuserDetail,
} from "../store/authSlices/LoginSlice";
import Loading from "../Components/Loading";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Routes = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const accessToken = useSelector((state) => state.login.accessToken);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const userData = await AsyncStorage.getItem(userDetail);
        if (!token || !userData) {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem(userDetail);
          setIsToken(false);
        } else {
          dispatch(setAccessToken(token));
          dispatch(setuserDetail(userData));
          dispatch(getLoggedInUSerInfo());
          setIsToken(true);
          setTimeout(() => {
            setAppIsReady(true);
          }, 500);
          // const userResponce = await AuthServices.getUserInfo();
          // dispatch(setuserDetail(userResponce?.data?.Data));
          // setAppIsReady(userResponce?.data?.Success);
        }
      } catch (e) {
        console.warn(e);
        dispatch(setAccessToken(null));
        await AsyncStorage.removeItem("accessToken");
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  (async function () {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  })();
  if (!appIsReady) {
    return <Loading />; // Optionally render a loading indicator here
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={screenName.splash} component={Splash} /> */}
      {/* {isToken ? ( */}
      {accessToken == null ? (
        <>
          <Stack.Screen name={screenName.authRoute} component={AuthRoute} />
        </>
      ) : (
        <>
          {/* <Stack.Screen name={"location"} component={Location} /> */}
          {/* <Stack.Screen name={"Payment"} component={Payment} /> */}
          <Stack.Screen
            name={screenName.drawerNavigation}
            component={DrawerNavigation}
          />
          {/* <Stack.Screen name={screenName.contactUs} component={ContactUs} /> */}
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

          <Stack.Screen name={screenName.postData} component={PostData} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;

