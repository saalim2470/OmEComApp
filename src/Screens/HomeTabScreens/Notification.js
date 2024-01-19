import { StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import NotificationCard from "../../Components/NotificationCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Notification"} />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
