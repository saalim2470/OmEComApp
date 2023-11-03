import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerNavigation from "../Navigation/DrawerNavigation";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigation />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
