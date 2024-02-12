import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import * as Linking from "expo-linking";

const PlayStoreRating = () => {
  const url = Linking.useURL();

  useEffect(() => {
    // Do something with url
    console.log("-=-=url=-=-", url);
  }, [url]);
  const handleURL = (url) => {
    const { hostname, path, queryParams } = Linking.parse(url);
    const a = Linking.parse(url);
    console.log(a);
    if (path === "alert") {
      alert(queryParams.str);
    } else {
      console.log(path, queryParams);
    }
  };
  useEffect(() => {
    // Do something with URL
    if (url) {
      handleURL(url);
    } else {
      console.log("No URL");
    }
  }, [url]);
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"PlayStore Rating"} />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text>Show</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PlayStoreRating;

const styles = StyleSheet.create({});
