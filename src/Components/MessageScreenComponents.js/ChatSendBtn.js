import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Send } from "react-native-gifted-chat";

const ChatSendBtn = (props) => {
  console.log(props);
  return (
    <Send {...props}>
      <View style={{ marginRight: 10, marginBottom: 5 }}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
          }}
          resizeMode={"center"}
        />
      </View>
    </Send>
  );
};

export default ChatSendBtn;

const styles = StyleSheet.create({});
