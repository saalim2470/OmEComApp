import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";

const ReferToFriend = () => {
  return (
    <SafeAreaView style={commonStyle.container}>
       <CustomeHeader isBackBtn={true} title={"Refer to friend"} />
    </SafeAreaView>
  );
};

export default ReferToFriend;

const styles = StyleSheet.create({});
