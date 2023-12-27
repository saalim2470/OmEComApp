import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeAlertModal from "../CustomeAlertModal";
import CommentView from "../CommentComponent/CommentView";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentByContentIdApi,
  resetCommentData,
} from "../../store/commentSlices/GetCommentByContentIdSlice";

const ProfileFeedCardBottomView = ({ itemData }) => {
  const dispatch = useDispatch();
  const {
    commentData: commentDataRes,
    isLoading: commentLoading,
    error: commentError,
    errorCode: commentErrorCode,
  } = useSelector((state) => state.getCommentByContentId);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const url = `whatsapp://send?phone=${itemData?.user?.phoneNumber}&text=Hello`;
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        setShowAlert({
          show: true,
          title: "UnAuthorized",
          msg: "Please login to continue",
          type: "warning",
        });
      } else if (code != null && commentError != null) {
        setShowAlert({
          show: true,
          title: "Error",
          msg: commentError.ErrorMessage || "Some Error Occurred",
          type: "error",
        });
      }
    };

    handleErrorCode(commentErrorCode);
  }, [commentError, commentErrorCode]);
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
  const onClickBookmarkBtn = () => {};
  const onClickLikeBtn = () => {};
  const onClickComment = () => {
    setIsShowBottomSheet(true);
    dispatch(getCommentByContentIdApi(itemData?.id, 1, 10));
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
              setIsShowBottomSheet(true);
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
      <Text style={styles.likeTxt}>0 likes</Text>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginTop: verticalScale(4) }}
        activeOpacity={0.6}
        onPress={() => {
          onClickComment();
        }}
      >
        <Text style={styles.commentTxt}>View all 2 comments</Text>
      </TouchableOpacity>
      <CommentView
        postDetail={itemData}
        isVisible={isShowBottomSheet}
        isLoading={commentLoading}
        error={commentError}
        errorCode={commentErrorCode}
        onBackDropPress={() => {
          setIsShowBottomSheet(false);
        }}
        commentData={commentDataRes?.Data}
      />
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          dispatch(resetCommentData());
          setShowAlert({
            ...showAlert,
            show: false,
          });
        }}
      />
    </>
  );
};

export default ProfileFeedCardBottomView;

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
