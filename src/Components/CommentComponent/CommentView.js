import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { Avatar } from "react-native-paper";
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
  setCommentPage,
} from "../../store/commentSlices/GetCommentByContentIdSlice";
import CustomeAlertModal from "../CustomeAlertModal";
import colors from "../../Constants/colors";

const CommentView = ({ isVisible, postDetail, onBackDropPress = () => {} }) => {
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
  console.log(
    "-=-=-comment data-=-=",
    useSelector((state) => state.getCommentByContentId)
  );
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
  const onClickPost = () => {
    const data = {
      title: "string",
      description: commentTxt.trim(),
      userId: userDetail?.userId,
      adContentId: postDetail?.id,
    };
    Keyboard.dismiss();
    dispatch(postCommentApi(data)).then((res) => {
      setCommentTxt("");
      dispatch(setCommentPage(1));
      getCommentData();
    });
  };
  const renderItem = ({ item, index }) => {
    return <CommentItem item={item} />;
  };
  const getCommentData = () => {
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
      getCommentData();
    }
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
        {commentLoading ? (
          <Loading />
        ) : !commentLoading && commentError != null ? (
          <ServerError
            msg={commentError?.ErrorMessage}
            statusCode={commentErrorCode}
          />
        ) : !commentLoading && commentData?.length <= 0 ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text>No Comment Yet</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={commentData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={listFooterComponent}
              onEndReached={onReachedEnd}
              onEndReachedThreshold={0.1}
            />
          </>
        )}
        <View style={styles.txtInputView}>
          <Avatar.Image
            source={{
              uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
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
              disabled={postCommentLoading}
              onPress={() => {
                onClickPost();
              }}
            >
              <Text style={{ color: "blue" }}>Post</Text>
            </TouchableOpacity>
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
