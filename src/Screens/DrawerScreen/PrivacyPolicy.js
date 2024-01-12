import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { WebView } from "react-native-webview";

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Privacy Policy"} />
      <WebView style={{}} source={{ uri: "https://www.google.com/" }} />
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
