import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { InputToolbar } from "react-native-gifted-chat";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import images from "../../Constants/images";
import colors from "../../Constants/colors";

const ChatInputBox = ({ props, onSend }) => {
  const [txt, setTxt] = useState("");
  console.log(props);
  return (
    // <InputToolbar
    //   {...props}
    //   containerStyle={{
    //     backgroundColor: "white",
    //     // borderTopColor: "#E8E8E8",
    //     // padding: 8,
    //     borderWidth: 1,
    //     bottom: verticalScale(10),
    //   }}
    //   primaryStyle={{ borderWidth: 1 }}
    //   textinputstyle={{ borderWidth: 1 }}
    // />
    <View style={styles.bottomContainer}>
      <View style={styles.searchBoxStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={images.emojiIcon}
            style={[styles.iconStyle, { marginRight: moderateScale(8) }]}
          />
          <TextInput
            placeholder="Write a message..."
            style={styles.txtBox}
            onChangeText={(txt) => {
              setTxt(txt);
            }}
          />
        </View>
        <Image source={images.fileUploaderIcon} style={styles.iconStyle} />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.micBtn}
        onPress={() => {
          onSend(txt);
        }}
      >
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
    </View>
  );
};

export default ChatInputBox;
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
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(10),
    flex: 1,
  },
});
