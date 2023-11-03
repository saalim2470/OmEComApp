import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const MessageStripeCard = ({ data, onClickMsg = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.msgStripeView}
      onPress={() => {
        onClickMsg();
      }}
    >
      <View style={styles.msgStripeViewLeftView}>
        <Avatar.Image
          size={scale(40)}
          style={{ marginRight: moderateScale(8) }}
          source={{
            uri: data?.profileImg,
          }}
        />
        <View style={{ width: scale(200) }}>
          <Text style={styles.titleTxt}>{data?.userName}</Text>
          <Text style={styles.lightTxt} numberOfLines={1}>
            {data?.msg}
          </Text>
          <Text style={styles.lightTxt}>2 days ago</Text>
        </View>
      </View>
      <View style={styles.msgStripeViewRightView}>
        {data?.productImg != "" ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: data?.productImg,
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default MessageStripeCard;

const styles = StyleSheet.create({
  msgStripeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(5),
  },
  msgStripeViewLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgStripeViewRightView: {
    height: scale(50),
    width: scale(50),
  },
  titleTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(10.5),
  },
  lightTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(9),
    lineHeight: 18,
  },
});
