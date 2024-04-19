import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { Avatar, Divider } from "react-native-paper";
import CommentItem from "./CommentItem";
import Loading from "../Loading";
import ServerError from "../ErrorScreens/ServerError";
import FriendlyMsg from "../ErrorScreens/FriendlyMsg";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import {
  postCommentApi,
  resetPostCommentData,
} from "../../store/commentSlices/PostCommentSlice";
import {
  getCommentByContentIdApi,
  resetCommentPage,
  setCommentPage,
} from "../../store/commentSlices/GetCommentByContentIdSlice";
import CustomeAlertModal from "../CustomeAlertModal";
import colors from "../../Constants/colors";
import ProfileImage from "../ProfileImage";

const SHEET_HEIGHT = Dimensions.get("screen").height / 2;
const CommentSection = ({
  isVisible,
  postDetail,
  onBackDropPress = () => {},
}) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.login?.userDetail);
  const {
    commentData: commentDataRes,
    isLoading: commentLoading,
    error: commentError,
    errorCode: commentErrorCode,
    page: commentPage,
    pageSize: commentPageSize,
    isSuccess: getCommentSuccesss,
    isMoreLoading: getCommentMoreLoading,
    isReachedEnd: getCommentReachedEnd,
  } = useSelector((state) => state.getCommentByContentId);
  const {
    postComment: postCommentRes,
    isLoading: postCommentLoading,
    error: postCommentError,
    errorCode: postCommentErrorCode,
  } = useSelector((state) => state.postComment);
  const [commentTxt, setCommentTxt] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    getCommentData();
  }, [commentPage,postCommentRes?.Success]);
  
  useEffect(() => {
    if (commentDataRes && getCommentSuccesss) {
      setCommentData(commentDataRes);
    }
  }, [commentDataRes, getCommentSuccesss]);
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        showModal("UnAuthorized", "Please login to continue", "warning");
      } else if (code != null && postCommentError != null) {
        showModal(
          "Error",
          postCommentError.ErrorMessage || "Some Error Occurred",
          "error"
        );
      }
    };

    handleErrorCode(postCommentErrorCode);
  }, [postCommentError, postCommentErrorCode]);
  const showModal = (title, msg, type) => {
    setShowAlert({
      show: true,
      title: title,
      msg: msg,
      type: type,
    });
  };
  const onClickPost =async () => {
    const data = {
      title: "string",
      description: commentTxt.trim(),
      userId: userDetail?.userId,
      adContentId: postDetail?.id,
    };

    dispatch(postCommentApi(data)).then((res) => {
      dispatch(resetCommentPage(postDetail?.id));
      setCommentTxt("");
    });
    // dispatch(postCommentApi(data))
  };
  const renderItem = ({ item, index }) => {
    return <CommentItem item={item} />;
  };
  const getCommentData = () => {
    dispatch(resetPostCommentData())
    dispatch(
      getCommentByContentIdApi(postDetail?.id, commentPage, commentPageSize)
    );
  };
  const listFooterComponent = () => {
    return (
      getCommentMoreLoading && (
        <ActivityIndicator
          style={{ paddingVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };
  const onReachedEnd = () => {
    if (!getCommentReachedEnd) {
      dispatch(setCommentPage(commentPage + 1));
      // getCommentData();
    }
  };
  if (commentLoading) {
    return <Loading />;
  }
  if (!commentLoading && commentError !== null) {
    return (
      <ServerError
        msg={commentError?.ErrorMessage}
        statusCode={commentErrorCode}
      />
    );
  }
  return (
    <>
      <View style={styles.modalView}>
        <Text style={styles.headingTxt}>Comments</Text>
        <Divider
          style={{
            marginTop: verticalScale(10),
          }}
        />
        {!commentLoading &&
        commentError === null &&
        commentData?.length <= 0 ? (
          <View style={styles.msgView}>
            <Text style={styles.msgTxt}>No Comment Yet</Text>
          </View>
        ) : (
          <View
            style={{
              // height: verticalScale(260),
              flex: 1,
              marginBottom: verticalScale(30),
            }}
          >
            <FlatList
              data={commentData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={listFooterComponent}
              onEndReached={onReachedEnd}
              onEndReachedThreshold={1}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.commentContainerStyle}
            />
          </View>
        )}
        <View style={styles.txtInputView}>
          <ProfileImage url={userDetail?.profilePicture} size={scale(30)}/>
          <TextInput
            style={{ flex: 1, padding: verticalScale(3) }}
            placeholder="Add comment"
            value={commentTxt}
            onChangeText={(value) => {
              setCommentTxt(value);
            }}
          />
          {commentTxt != "" ? (
            <TouchableWithoutFeedback
              style={{ padding: moderateScale(5) }}
              disabled={postCommentLoading}
              onPress={() => {
                onClickPost();
              }}
            >
              {postCommentLoading ? (
                <ActivityIndicator color={colors.themeColor} />
              ) : (
                <Text style={{ color: "blue" }}>Post</Text>
              )}
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          dispatch(resetPostCommentData());
          setShowAlert({
            ...showAlert,
            show: false,
          });
        }}
      />
    </>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  modalView: {
    // paddingRight: moderateScale(15),
    // paddingLeft: moderateScale(15),
    flex: 1,
  },
  cardHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  onlyRowStyle: {
    flexDirection: "row",
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
    marginTop: verticalScale(7),
    marginHorizontal: moderateScale(15),
    backgroundColor: "#FFFFFF",
  },
  headingTxt: {
    alignSelf: "center",
    fontFamily: "Montserrat-Medium",
    marginVertical: verticalScale(5),
  },
  commentContainerStyle: {
    gap: scale(7),
    marginHorizontal: moderateScale(15),
    marginTop: verticalScale(5),
  },
  msgView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  msgTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(14),
  },
});
