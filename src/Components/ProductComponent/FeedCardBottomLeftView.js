import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import { useDispatch } from "react-redux";
import { saveContentApi } from "../../store/AdContentSlices/SaveContentSlice";
import { addLikeOnContentApi } from "../../store/AdContentSlices/LikeSlice";

const FeedCardBottomLeftView = ({ itemData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onClickBookmarkBtn = () => {
    dispatch(
      saveContentApi({
        adContentID: itemData?.id,
        isSaved: !itemData?.isCurrentUserSaved,
      })
    );
  };
  const onClickLikeBtn = () => {
    dispatch(
      addLikeOnContentApi({
        contentId: itemData?.id,
        isLiked: !itemData?.isCurrentUserLiked,
      })
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onClickLikeBtn();
        }}
      >
        <Ionicons
          name={itemData?.isCurrentUserLiked ? "heart" : "heart-outline"}
          size={scale(24)}
          color={itemData?.isCurrentUserLiked ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screenName.message);
        }}
      >
        <MaterialCommunityIcons
          name="message-outline"
          size={scale(24)}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClickBookmarkBtn();
        }}
      >
        <Ionicons
          name={
            itemData?.isCurrentUserSaved
              ? "ios-bookmark"
              : "ios-bookmark-outline"
          }
          size={scale(24)}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default FeedCardBottomLeftView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: scale(15),
  },
});
