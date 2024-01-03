import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeHeader from "../../Components/CustomeHeader";
import commonStyle from "../../Constants/commonStyle";
import { WebView } from "react-native-webview";

const AboutUs = () => {
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"About us"} />
      <WebView
        //   style={styles.container}
        source={{ uri: "https://www.google.com/" }}
      />
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
