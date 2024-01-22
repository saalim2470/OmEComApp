import { Share, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { useIsFocused } from "@react-navigation/native";

const ReferToFriend = () => {
  const focused=useIsFocused()
  useEffect(() => {
    onShare();
  },[focused]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Om Classified Download to this link: https://www.google.com/",
        url: "https://www.google.com/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Refer to friend"} />
    </SafeAreaView>
  );
};

export default ReferToFriend;

const styles = StyleSheet.create({});
