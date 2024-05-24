import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import NotificationCard from "../../Components/NotificationCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserAllNotificationsApi,
  resetPage,
  setCurrentUserNotificationPage,
} from "../../store/NotificationSlices/GetCurrentUserAllNotifications";
import Loading from "../../Components/Loading";
import ListingComponent from "../../Components/ListingComponent";
import { verticalScale } from "react-native-size-matters";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const Notification = () => {
  const dispatch = useDispatch();
  const {
    notificationData,
    isLoading: notificationLoading,
    page,
    pageSize,
    isSuccess,
    isMoreLoading,
    isReachedEnd,
    error,
    statusCode: errorCode,
  } = useSelector((state) => state.getCurrentUserAllNotifications);
  const { readNotificationData: readData } = useSelector(
    (state) => state.getUserReadNotification
  );
  const [notification, setNotification] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getCurrentUserAllNotificationsApi(page, pageSize));
  }, [page, refreshing]);
  useEffect(() => {
    if (isSuccess) {
      setNotification(notificationData);
      setRefreshing(false);
    }
  }, [isSuccess, notificationData]);
  useEffect(() => {
    if (readData !== null && readData?.Success) {
      const updatedData = notification.map((item) => {
        if (item.id === readData?.Data?.id)
          return {
            ...item,
            isRead: readData?.Data?.isRead,
          };
        return item;
      });
      setNotification(updatedData);
    }
  }, [readData]);

  const onRefresh = useCallback(() => {
    dispatch(resetPage());
    setRefreshing(true);
  }, []);
  const onReachedEnd = () => {
    if (!isReachedEnd) {
      dispatch(setCurrentUserNotificationPage(page + 1));
    }
  };
  const renderItem = ({ item, index }) => {
    return <NotificationCard data={item}/>;
  };
  if (notificationLoading) {
    return <Loading />;
  }
  if (error !== null && !error?.Success) {
    return <ErrorMsg statusCode={errorCode} />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Notification"} />

      {!notificationLoading&&notification.length <= 0 ? (
        <FriendlyMsg msgWithImage={"No Notification"} />
      ) : (
        <View style={{ marginBottom: verticalScale(60) }}>
          <ListingComponent
            data={notification}
            loadMore={isMoreLoading}
            refreshing={refreshing}
            renderItem={renderItem}
            onReachedEnd={() => {
              onReachedEnd();
            }}
            onRefresh={() => {
              onRefresh();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
