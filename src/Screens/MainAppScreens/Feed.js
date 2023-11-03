import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import FeedCard from "../../Components/FeedCard";
import { Divider } from "react-native-paper";
import images from "../../Constants/images";

const Feed = () => {
  const data = [
    {
      id: 1,
      userName: "Elenaro",
      location: "63991 Eligin St.Canada 10229",
      desc: "Exclusive Mens Shoe",
      condition: "Used-Excellent",
      brand: "Puma",
      size: "M",
      color: "Green",
      price: "348",
      assets: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABH5we5erv84MFP1C4sPZjBLZPR9G4PdSSQ3qUiETN_XDIFrA",
      ],
    },
    {
      id: 2,
      userName: "John Doe",
      location:
        "56782 Eligin St.London 10229 jshdc jhfdh fhdhjd shsfj gjhfgj hgfjgh fjghfj",
      desc: "Exclusive Mens Shirts",
      condition: "Excellent",
      brand: "Levi's",
      size: "xxl",
      color: "Light Green",
      price: "499",
      assets: [images.introImg1, images.introImg2],
    },
  ];
  return (
    <View style={[commonStyle.container, { paddingTop: verticalScale(8) }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          item.id;
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
        renderItem={({ item, index }) => {
          return <FeedCard itemData={item} />;
        }}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({});
