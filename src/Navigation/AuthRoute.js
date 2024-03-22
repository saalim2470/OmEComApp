import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../Constants/screenName";
import Login from "../Screens/AuthScreens/Login";
import ForgotPassword from "../Screens/AuthScreens/ForgotPassword";
import ResetPassword from "../Screens/AuthScreens/ResetPassword";
import CreateAccount from "../Screens/AuthScreens/CreateAccount";
import Verification from "../Screens/AuthScreens/Verification";
import CheckEmail from "../Screens/AuthScreens/CheckEmail";

const Auth = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false,}}>
      <Auth.Screen name={screenName.login} component={Login} />
      <Auth.Screen
        name={screenName.forgotPassword}
        component={ForgotPassword}
      />
      <Auth.Screen name={screenName.resetPassword} component={ResetPassword} />
      <Auth.Screen name={screenName.createAccount} component={CreateAccount} />
      <Auth.Screen name={screenName.verification} component={Verification} />
      <Auth.Screen name={screenName.checkEmail} component={CheckEmail} />
    </Auth.Navigator>
  );
};
export default AuthRoute;
