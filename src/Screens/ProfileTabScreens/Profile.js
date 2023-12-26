import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "../../Components/Header";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import images from "../../Constants/images";
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getUserContentApi } from "../../store/profileSlices/GetUserContentSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/ErrorScreens/ServerError";
import ProfileFeedCard from "../../Components/ProfileScreenComponent/ProfileFeedCard";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
  } = useSelector((state) => state.getUSerContent);
  useEffect(() => {
    dispatch(getUserContentApi(1, 70));
  }, []);

  const renderItem = ({ item, index }) => {
    return <ProfileFeedCard itemData={item} />;
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <ProfileScreenTopView />
      {userContentLoading ? (
        <Loading />
      ) : userContentError != null && !userContentError.Success ? (
        <ServerError
          msg={
            userContentError?.ErrorMessage ||
            "Some error occured during fetching data"
          }
        />
      ) : userContentRes.length <= 0 ? (
        <Text>Post your fisrt Ad</Text>
      ) : (
        <FlatList
          data={userContentRes}
          keyExtractor={(item, index) => {
            `data_${item.id}_${index}`;
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
