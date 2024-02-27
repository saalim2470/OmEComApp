import { StatusBar } from "expo-status-bar";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
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
import * as Linking from "expo-linking";
import { useEffect } from "react";
import Loading from "./src/Components/Loading";

const theme = {
  dark: false,
};
const prefix = Linking.createURL("/");
export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const config = {
    screens: {
      DrawerNavigation: {
        screens: {
          BottonNavigation: {
            screens: {
              BottomNavigationHomeRoute: {
                screens: {
                  OtherUserProfile: "OtherUserProfile/:userId",
                  MainHome: "MainHome",
                },
              },
            },
          },
        },
      },
    },
  };
  const linking = {
    prefixes: [prefix,'https://suryahealthclub.com/'],
    config,
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <BottomSheetModalProvider>
            <NavigationContainer
              linking={linking}
              fallback={<Loading/>}
            >
              <Routes />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
// AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({});
