import { StatusBar } from "expo-status-bar";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Navigation/Routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import fonts from "./src/Constants/fonts";
import { Provider } from "react-redux";
import store from "./src/store";
import { PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { name as appName } from "./app.json";
import { useState, useEffect, useRef } from "react";

const theme = {
  dark: false,
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);

  // useEffect(() => {
  //   // Handle incoming deep links
  //   const handleDeepLink = async (url) => {
  //     // Your logic to handle the deep link
  //     // Example: open a specific screen based on the URL
  //     alert(url);
  //     Linking.openURL(url);
  //   };

  //   // Check if the app was opened from a deep link
  //   const checkInitialUrl = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     if (initialUrl) {
  //       alert(url);
  //       handleDeepLink(initialUrl);
  //     }
  //   };

  //   checkInitialUrl();

  //   // Listen for incoming deep links while the app is running
  //   const deepLinkListener = Linking.addEventListener("url", ({ url }) => {
  //     handleDeepLink(url);
  //   });

  //   // Clean up the event listener when the component unmounts
  //   return () => deepLinkListener.remove();
  // }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }
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
