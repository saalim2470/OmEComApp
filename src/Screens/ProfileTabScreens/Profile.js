import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "../../Components/Header";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import images from "../../Constants/images";
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [feedData, setFeedData] = useState([
    {
      title: "Oven",
      description: "Dgdjdj to the meaning of science ",
      categoryId: 1,
      userId: "6444f3e6-52dd-46aa-80a8-a4b7fd9836ca",
      specifications: "[]",
      imagesData:
        '["9c126dea-7958-427c-9a20-c8e669c31b3dimage_0.jpeg","c89aaf03-a1d4-4a3f-a673-cbcfe41971f3image_1.jpeg","126a8b52-e8d4-4d59-900b-f665d70e7be1image_2.jpeg"]',
      isDraft: false,
      isCurrentUserLiked: false,
      isCurrentUserSaved: false,
      user: {
        id: "6444f3e6-52dd-46aa-80a8-a4b7fd9836ca",
        firstname: "Saalim",
        lastname: "shaikh",
        phoneNumber: "9016730106",
      },
      id: 1,
      files: null,
      filesUrls: null,
    },
    {
      title: "Fridge",
      description: "Dhhdjdjd to the meaning of science ",
      categoryId: 1,
      userId: "6444f3e6-52dd-46aa-80a8-a4b7fd9836ca",
      specifications: "[]",
      imagesData:
        '["bdd66493-1499-4f20-9f69-b7d11ff50253image_0.jpeg","0ed287ed-a861-4082-89ff-ffa7be184a2fimage_1.jpeg"]',
      isDraft: false,
      isCurrentUserLiked: false,
      isCurrentUserSaved: false,
      user: {
        id: "6444f3e6-52dd-46aa-80a8-a4b7fd9836ca",
        firstname: "Saalim",
        lastname: "shaikh",
        phoneNumber: "9016730106",
      },
      id: 2,
      files: null,
      filesUrls: null,
    },
  ]);
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        isShowOptionBtn={true}
        isMoreBtn={true}
        isOfferBtn={true}
        menuChildren={
          <>
            <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item onPress={() => {}} title="Delete" />
          </>
        }
        onClickMoreBtn={() => {
          // navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <ProfileScreenTopView />
      <FlatList
        data={feedData}
        keyExtractor={(item) => {
          item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
