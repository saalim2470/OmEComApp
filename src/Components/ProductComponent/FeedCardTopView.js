import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import ReadMore from "react-native-read-more-text";

const FeedCardTopView = ({ itemData, disable }) => {
  const navigation = useNavigation();
  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={[styles.descTxt, { marginTop: verticalScale(5), color: "blue" }]}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };
  const renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={[styles.descTxt, { marginTop: verticalScale(5), color: "blue" }]}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(screenName.productDetail, { data: itemData });
      }}
      disabled={disable}
      style={styles.topView}
    >
      <ReadMore
        numberOfLines={3}
        renderTruncatedFooter={renderTruncatedFooter}
        renderRevealedFooter={renderRevealedFooter}
        //   onReady={this._handleTextReady}
      >
        <Text style={styles.descTxt}>{itemData?.description}</Text>
      </ReadMore>
    </Pressable>
  );
};

export default FeedCardTopView;

const styles = StyleSheet.create({
  topView: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(5),
  },
  descTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(13),
  },
});
