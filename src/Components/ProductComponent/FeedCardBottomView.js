import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeAlertModal from "../CustomeAlertModal";
import CustomeBottomSheet from "../CustomeBottomSheet";

const FeedCardBottomView = ({
  itemData,
  onClickLike = () => {},
  onClickMsg = () => {},
  onClickBookMark = () => {},
  onClickComment = () => {},
}) => {
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(-1);
  const url = `whatsapp://send?phone=${itemData?.user?.phoneNumber}&text=Hello`;
  const checkWhatsAppInstalled = async () => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        setShowAlert({
          show: true,
          title: "WhatsApp",
          msg: "Please Install WhatsApp",
          type: "warning",
        });
      }
    } catch (error) {
      console.log("-=-=-wa error-=-=-", error);
    }
  };
  return (
    <>
      <View style={[commonStyle.row]}>
        <View
          style={{
            flexDirection: "row",
            gap: scale(15),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onClickLike();
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
              onClickComment();
            }}
          >
            <MaterialCommunityIcons
              name="message-outline"
              size={scale(24)}
              color="black"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              onClickMsg();
            }}
          >
            <Ionicons name="mail-outline" size={scale(24)} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              onClickBookMark();
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
            {/* fill icon */}
            {/* <Ionicons name="ios-bookmark" size={scale(24)} color="black" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              checkWhatsAppInstalled();
            }}
          >
            <Image
              source={images.whatsAppLogo}
              style={[styles.iconStyle, { marginRight: moderateScale(15) }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${itemData?.user?.phoneNumber}`);
            }}
            activeOpacity={0.4}
          >
            <Image source={images.phoneIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.likeTxt}>452 likes</Text>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginTop: verticalScale(4) }}
        activeOpacity={0.6}
        onPress={() => {
          onClickComment();
        }}
      >
        <Text style={styles.commentTxt}>View all 2 comments</Text>
      </TouchableOpacity>
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          setShowAlert({
            ...showAlert,
            show: false,
          });
        }}
      />
    </>
  );
};

export default FeedCardBottomView;

const styles = StyleSheet.create({
  iconStyle: {
    width: scale(25),
    height: scale(25),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(11),
  },
  commentTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
  },
});
