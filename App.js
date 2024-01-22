import { StatusBar } from "expo-status-bar";
import {  AppRegistry, StyleSheet, Text, View } from "react-native";
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
import { name as appName } from './app.json';

export default function App() {
  const [fontsLoaded,fontError] = useFonts(fonts);
  if (!fontsLoaded&& !fontError) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider store={store}>
        <PaperProvider>
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
