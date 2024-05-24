import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import colors from "../../Constants/colors";
import ProfileImage from "../ProfileImage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CommentTextInput = ({
  setvalue,
  onClickPost = () => {},
  disable,
  showBtn,
  loading,
  value
}) => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  return (
    //  <ScrollView
    // //  style={styles.txtInputView}
    //     // resetScrollToCoords={{ x: 0, y: 0 }}
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={styles.txtInputView}
    //     nestedScrollEnabled={true}
    //     keyboardShouldPersistTaps='handled'
    //   >
    <View style={styles.txtInputView}>
      <ProfileImage url={userDetail?.profilePicture} size={scale(30)} />
      <TextInput
        style={{ flex:1, padding: verticalScale(3) }}
        placeholder="Add comment"
        value={value}
        onChangeText={(value) => {
          setvalue(value);
        }}
      />
      {showBtn ? (
        <TouchableOpacity
          style={{ padding: moderateScale(5)}}
          disabled={disable}
          onPress={() => {
            onClickPost();
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.themeColor} />
          ) : (
            <Text style={{ color: "blue" }}>Post</Text>
          )}
        </TouchableOpacity>
      ) : null}
    </View>
      // {/* </ScrollView>  */}
  );
};

export default CommentTextInput;

const styles = StyleSheet.create({
  txtInputView: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(5),
    alignSelf: "center",
    marginTop: verticalScale(7),
    marginHorizontal: moderateScale(15),
    backgroundColor: "#FFFFFF",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf: "center",
    flex:1
    // marginTop: verticalScale(7),
    // marginHorizontal: moderateScale(15),
    // backgroundColor: "#FFFFFF",
  },
});
