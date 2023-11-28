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

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={screenName.splash}
      initialRouteName={'PostData'}
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
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'PostData'} component={PostData} />
    </Stack.Navigator>
  );
};

export default Routes;
