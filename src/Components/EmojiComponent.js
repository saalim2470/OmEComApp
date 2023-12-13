import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import ReactNativeModal from "react-native-modal";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const EmojiComponent = ({
  onClick = () => {},
  show,
  onBackdropPress = () => {},
}) => {
  return (
    <ReactNativeModal
      isVisible={show}
      coverScreen={true}
      backdropOpacity={0.3}
      onBackdropPress={() => {
        onBackdropPress();
      }}
      style={{ marginHorizontal: 0, marginVertical: 0 }}
    >
      <View
        style={{
          backgroundColor: "white",
          height: verticalScale(250),
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingVertical: verticalScale(5),
        }}
      >
        <EmojiSelector
          category={Categories.all}
          onEmojiSelected={(emoji) => onClick(emoji)}
          showSectionTitles={false}
          theme="black"
          showSearchBar={false}
          columns={9}
        />
      </View>
    </ReactNativeModal>
  );
};

export default EmojiComponent;

const styles = StyleSheet.create({});
