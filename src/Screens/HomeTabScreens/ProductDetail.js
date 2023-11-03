import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import AdView from "../../Components/SearchScreenComponents/AdView";
import FeedCardWithDescription from "../../Components/ProductComponent/FeedCardWithDescription";

const ProductDetail = ({ route }) => {
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Product Detail"} />
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FeedCardWithDescription
          itemData={route?.params?.data}
          isShowContactBtn={true}
        />
        <AdView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
