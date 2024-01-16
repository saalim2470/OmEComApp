import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";

const PlayStoreRating = () => {
  return (
    <SafeAreaView style={commonStyle.container}>
       <CustomeHeader isBackBtn={true} title={"PlayStore Rating"} />
    </SafeAreaView>
  );
};

export default PlayStoreRating;

const styles = StyleSheet.create({});
