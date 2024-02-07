import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import * as Linking from 'expo-linking';

const PlayStoreRating = () => {
  const url = Linking.useURL("exp://192.168.29.143:8081//alert?str='hello world'");

    useEffect(() => {
        // Do something with url
        console.log(url);
    }, [url]);
    const handleURL = (url) => {
      const { hostname, path, queryParams } = Linking.parse(url);
      if (path === 'alert') {
          alert(queryParams.str);
      } else {
          console.log(path, queryParams);
      }
  }
  useEffect(() => {
    // Do something with URL
    if (url) {
        handleURL(url);
    } else {
        console.log('No URL');
    }
}, [url])
  return (
    <SafeAreaView style={commonStyle.container}>
       <CustomeHeader isBackBtn={true} title={"PlayStore Rating"} />
    </SafeAreaView>
  );
};

export default PlayStoreRating;

const styles = StyleSheet.create({});
