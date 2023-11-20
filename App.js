import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
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

const styles = StyleSheet.create({});
