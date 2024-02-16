import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import NotificationCard from "../../Components/NotificationCard";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
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
