import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CustomeHeader from "../../Components/CustomeHeader";
import { Avatar, Divider } from "react-native-paper";
import images from "../../Constants/images";
import ChatScreenTopCard from "../../Components/MessageScreenComponents.js/ChatScreenTopCard";
import colors from "../../Constants/colors";
import { GiftedChat, Send } from "react-native-gifted-chat";
import ChatInputBox from "../../Components/MessageScreenComponents.js/ChatInputBox";
import ChatSendBtn from "../../Components/MessageScreenComponents.js/ChatSendBtn";

const MessageChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} msgUserHeader={true} />
      <Divider
        style={{ marginTop: verticalScale(5), marginBottom: verticalScale(5) }}
      />
      <View style={[commonStyle.innerContainer]}>
        <ChatScreenTopCard />
        <Text style={styles.todayTxt}>Today</Text>
        {/* <View
          style={{
            borderWidth: 1,
            flexDirection: "row",
            alignSelf: "flex-start",
            width: scale(250),
            overflow: "hidden",
          }}
        >
          <Avatar.Image
            size={scale(30)}
            style={{ marginRight: moderateScale(5) }}
            source={{
              uri: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
            }}
          />
          <View style={{ marginLeft: moderateScale(5) }}>
            <View style={[styles.msgBack]}>
              <Text style={styles.msgTxt} numberOfLines={2}>
                Hey there Whats's up? hfdhb wdjk njjkn
              </Text>
            </View>
            <Text style={styles.timeTxt}>1:20 Pm</Text>
          </View>
        </View> */}
        <GiftedChat
          messages={messages}
          placeholder={"Write a message..."}
          showUserAvatar={false}
          renderAvatarOnTop={true}
          showAvatarForEveryMessage={false}
          //   renderInputToolbar={(props) => (
          //     <ChatInputBox
          //       props={props}
          //       //   onSend={(messages) => onSend(messages)}
          //     />
          //   )}
          onSend={(messages) => onSend(messages)}
          //   renderSend={(props) => <ChatSendBtn props={props} />}
          renderSend={(props) => (
            <Send
              {...props}
              containerStyle={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
                }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </Send>
          )}
          user={{
            _id: 1,
            avatar:
              "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
          }}
        />
        {/* bottom write msg view */}
        {/* <View style={styles.bottomContainer}>
          <View style={styles.searchBoxStyle}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={images.emojiIcon}
                style={[styles.iconStyle, { marginRight: moderateScale(8) }]}
              />
              <TextInput
                placeholder="Write a message..."
                style={styles.txtBox}
              />
            </View>
            <Image source={images.fileUploaderIcon} style={styles.iconStyle} />
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.micBtn}>
            <Image
              source={images.micIcon}
              style={{
                aspectRatio: 1,
                tintColor: "#FFFFFF",
                width: scale(30),
                height: scale(30),
              }}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default MessageChatScreen;

const styles = StyleSheet.create({
  searchBoxStyle: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(8),
    height: verticalScale(38),
    alignItems: "center",
    width: scale(265),
    borderRadius: scale(5),
    backgroundColor: "#f3f3f3",
    justifyContent: "space-between",
    marginRight: moderateScale(16),
  },
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
  txtBox: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(3),
    width: scale(200),
  },
  micBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: 100,
    backgroundColor: colors.themeColor,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    marginHorizontal: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(10),
    flex: 1,
  },
  todayTxt: {
    textAlign: "center",
    fontFamily: "Montserrat-Light",
    fontSize: scale(11),
    marginVertical: verticalScale(12),
  },
  msgTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(11),
  },
  timeTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(9),
  },
  msgBack: {
    backgroundColor: "#f3f3f3",
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(5),
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(2),
  },
});
