import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider, Menu } from "react-native-paper";
import screenName from "../../Constants/screenName";
import { verticalScale } from "react-native-size-matters";
import images from "../../Constants/images";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const BookmarkScreen = ({ navigation }) => {
  const contentDataRes = useSelector(
    (state) => state.getAddContentByCategory.contentData
  );
  const [contentData, setContentData] = useState([]);
  // useEffect(() => {
  //   const data=contentDataRes?.filter((item,index)=>item?.isCurrentUserSaved)
  //   setContentData(data)
  // }, [contentDataRes])

  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Saved Items"} />
      {/* <FlatList
        data={contentData}
        keyExtractor={(item) => {
          item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
        renderItem={({ item, index }) => {
          return (
            <FeedCard
              itemData={item}
              isMoreBtn={true}
              isOfferBtn={true}
              onClickMsgBtn={() => {
                navigation.navigate(screenName.messagesHome);
              }}
              onClickMoreBtn={() => {
                navigation.navigate(screenName.productDetail, { data: item });
              }}
            />
          );
        }}
      /> */}
    </SafeAreaView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});
