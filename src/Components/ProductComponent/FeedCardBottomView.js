import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeAlertModal from "../CustomeAlertModal";
import CommentView from "../CommentComponent/CommentView";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentByContentIdApi,
  resetCommentData,
  setCommentPage,
} from "../../store/commentSlices/GetCommentByContentIdSlice";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import FeedCardBottomLeftView from "./FeedCardBottomLeftView";
import FeedCardBottomRightView from "./FeedCardBottomRightView";

const FeedCardBottomView = ({ itemData }) => {
  const dispatch = useDispatch();
  const {
    commentData: commentDataRes,
    isLoading: commentLoading,
    error: commentError,
    errorCode: commentErrorCode,
    page: commentPage,
    pageSize: commentPageSize,
  } = useSelector((state) => state.getCommentByContentId);

  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        setShowAlert({
          show: true,
          title: "UnAuthorized",
          msg: "Please login to continue",
          type: "warning",
        });
      } else if (!commentError?.Success && commentError != null) {
        setShowAlert({
          show: true,
          title: "Error",
          msg: commentError?.ErrorMessage || "Some Error Occurred",
          type: "error",
        });
      }
    };

    handleErrorCode(commentErrorCode);
  }, [commentError, commentErrorCode]);

  const onClickComment = () => {
    setIsShowBottomSheet(true);
    dispatch(setCommentPage(1));
    getCommentData();
  };
  const getCommentData = () => {
    console.log("=-=-=-comment page-=-=", commentPage);
    dispatch(
      getCommentByContentIdApi(itemData?.id, commentPage, commentPageSize)
    );
  };
  const onClickModalBtn = () => {
    dispatch(resetCommentData());
    dispatch(resetLikeData());
    setShowAlert({
      ...showAlert,
      show: false,
    });
  };
  return (
    <>
      <View style={[commonStyle.row]}>
        <FeedCardBottomLeftView itemData={itemData} />
        <FeedCardBottomRightView itemData={itemData} />
      </View>
      <Text style={styles.likeTxt}>{`${itemData?.totalLikes} likes`}</Text>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginTop: verticalScale(4) }}
        activeOpacity={0.6}
        onPress={() => {
          onClickComment();
        }}
      >
        <Text
          style={styles.commentTxt}
        >{`View all ${itemData?.totalComments} comments`}</Text>
      </TouchableOpacity>
      <CommentView
        postDetail={itemData}
        isVisible={isShowBottomSheet}
        onBackDropPress={() => {
          setIsShowBottomSheet(false);
        }}
      />
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          onClickModalBtn();
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
