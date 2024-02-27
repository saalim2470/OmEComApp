import { Share, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { useIsFocused } from "@react-navigation/native";
import { onShare } from "../../Constants/Constant";

const ReferToFriend = () => {
  const focused=useIsFocused()
  useEffect(() => {
    onShare('https://www.google.com/');
  },[focused]);

  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Refer to friend"} />
    </SafeAreaView>
  );
};

export default ReferToFriend;

const styles = StyleSheet.create({});
