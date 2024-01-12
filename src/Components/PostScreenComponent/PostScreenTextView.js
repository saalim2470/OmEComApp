import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import GridView from "../GridView";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

const PostScreenTextView = ({
  onChange = () => {},
  value,
  imageData,
  disabled,
  removeImage = () => {},
}) => {
  return (
    <KeyboardAvoidingScrollView style={styles.txtInputView}>
      <TextInput
        placeholder="About Something"
        multiline={true}
        value={value}
        textAlignVertical="top"
        style={{
          marginVertical: verticalScale(5),
          fontFamily: "Montserrat-Regular",
        }}
        onChangeText={(text) => {
          onChange(text);
        }}
      />
      <View>
        <GridView
          data={imageData}
          addCloseBtn={(index) => {
            return (
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  removeImage(index);
                }}
                activeOpacity={0.6}
                style={styles.removeBtn}
              >
                <Entypo
                  name="circle-with-cross"
                  size={scale(15)}
                  color="black"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </KeyboardAvoidingScrollView>
  );
};

export default PostScreenTextView;

const styles = StyleSheet.create({
  txtInputView: {
    marginTop: verticalScale(5),
    paddingHorizontal: moderateScale(8),
  },
  removeBtn: {
    position: "absolute",
    alignSelf: "flex-end",
    marginRight: moderateScale(2),
    zIndex: 999,
  },
});
