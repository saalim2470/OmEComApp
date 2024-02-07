import { StatusBar } from "expo-status-bar";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Navigation/Routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import fonts from "./src/Constants/fonts";
import DrawerNavigation from "./src/Navigation/DrawerNavigation";
import { Provider } from "react-redux";
import store from "./src/store";
import { PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { name as appName } from "./app.json";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const theme = {
  dark: false,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [fontsLoaded, fontError] = useFonts(fonts);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    if (!fontsLoaded && !fontError) {
      return null;
    }
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Routes />
              {/* <DrawerNavigation /> */}
            </NavigationContainer>
          </BottomSheetModalProvider>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({});
