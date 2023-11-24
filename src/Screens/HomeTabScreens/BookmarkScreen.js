import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider, Menu } from "react-native-paper";
import screenName from "../../Constants/screenName";
import { verticalScale } from "react-native-size-matters";
import images from "../../Constants/images";
import FeedCard from "../../Components/ProductComponent/FeedCard";

const BookmarkScreen = ({ navigation }) => {
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
  const onClickSaved = (index) => {
    const newData = [...feedData];
    const obj = {
      ...newData[index],
      isSaved: !newData[index].isSaved,
    };
    newData[index] = obj;
    setFeedData(newData);
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Saved Items"} />
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
              isMoreBtn={true}
              isOfferBtn={true}
              isShowOptionBtn={true}
              menuChildren={<Menu.Item onPress={() => {}} title="Edit" />}
              onClickBookmarkBtn={() => {
                onClickSaved(index);
              }}
              onClickMsgBtn={() => {
                navigation.navigate(screenName.messagesHome);
              }}
              onClickMoreBtn={() => {
                navigation.navigate(screenName.productDetail, { data: item });
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});
