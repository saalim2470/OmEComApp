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
      title: "Ladies wear",
      shorDescription: "Dbdvdgdjd",
      description: "Dhxhdhdj sty  ",
      categoryId: 7,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      promoterId: 0,
      condition: "Second",
      price: 200,
      brand: "Gdjd",
      specifications: "string",
      id: 17,
      userName: "_.abc._",
      location: "Surat",
      files: [
        "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1672876197.29825462!600x600!85.jpg",
        "https://i02.appmifile.com/mi-com-product/fly-birds/pair/pc/pc-pair.png?f=webp",
      ],
    },
    {
      title: "Fridge",
      shorDescription: "dbfdf fdhfdhfd",
      description: "djgfgf fjgkf",
      categoryId: 5,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      promoterId: 0,
      condition: "string",
      price: 15000,
      brand: "LG",
      specifications: "string",
      id: 18,
      userName: "_.abc._",
      location: "Surat",
      files: [
        "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1672876197.29825462!600x600!85.jpg",
        "https://i02.appmifile.com/mi-com-product/fly-birds/pair/pc/pc-pair.png?f=webp",
      ],
    },
    {
      title: "Ladies wear",
      shorDescription: "Dbdvdgdjd",
      description: "Dhxhdhdj sty  ",
      categoryId: 6,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      promoterId: 0,
      condition: "Second",
      price: 200,
      brand: "Gdjd",
      specifications: "string",
      id: 19,
      userName: "_.abc._",
      location: "Surat",
      files: [
        "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1672876197.29825462!600x600!85.jpg",
        "https://i02.appmifile.com/mi-com-product/fly-birds/pair/pc/pc-pair.png?f=webp",
      ],
    },
  ]);
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
        renderItem={({ item, index }) => {
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
              onClickBookmarkBtn={() => {}}
              onClickComment={() => {}}
              onClickMsgBtn={() => {}}
              onClickMoreBtn={() => {
                // navigation.navigate(screenName.productDetail, { data: item });
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
