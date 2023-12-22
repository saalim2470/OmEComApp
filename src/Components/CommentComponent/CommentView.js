import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { Avatar } from "react-native-paper";
import CommentItem from "./CommentItem";

const CommentView = ({
  isVisible,
  commentData,
  onBackDropPress = () => {},
}) => {
  const [commentTxt, setCommentTxt] = useState("");
  const onClickPost = () => {};
  const renderItem = ({ item, index }) => {
    return <CommentItem item={item}/>;
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      style={{ margin: 0 }}
      coverScreen={true}
      onBackdropPress={() => {
        onBackDropPress();
      }}
    >
      <View style={styles.modalView}>
        <Text style={{ alignSelf: "center" }}>Comments</Text>
        <FlatList
          data={commentData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.txtInputView}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
            }}
            size={scale(30)}
          />
          <TextInput
            style={{ flex: 1, padding: verticalScale(3) }}
            placeholder="Add comment"
            value={commentTxt}
            onChangeText={(value) => {
              setCommentTxt(value);
            }}
          />
          {commentTxt != "" ? (
            <TouchableOpacity
              style={{ paddingHorizontal: moderateScale(5) }}
              onPress={() => {
                onClickPost();
              }}
            >
              <Text style={{ color: "blue" }}>Post</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default CommentView;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(13),
    borderTopRightRadius: scale(13),
    paddingVertical: verticalScale(15),
    // paddingHorizontal: moderateScale(15),
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: verticalScale(300),
    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(15),
  },
  cardHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(11),
  },
  onlyRowStyle: {
    flexDirection: "row",
    // alignItems: "center",
  },
  commentTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
  },
  txtInputView: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(5),
    alignSelf: "center",
    width: "100%",
  },
});
