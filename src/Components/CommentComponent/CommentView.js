import {
  FlatList,
  Image,
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
import { getCommentByContentIdApi } from "../../store/commentSlices/GetCommentByContentIdSlice";
import CustomeAlertModal from "../CustomeAlertModal";

const CommentView = ({
  isVisible,
  commentData,
  isLoading,
  error,
  errorCode,
  postDetail,
  onBackDropPress = () => {},
}) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.login?.userDetail);
  const {
    postComment: postCommentRes,
    isLoading: postCommentLoading,
    error: postCommentError,
    errorCode: postCommentErrorCode,
  } = useSelector((state) => state.postComment);
  const [commentTxt, setCommentTxt] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        setShowAlert({
          show: true,
          title: "UnAuthorized",
          msg: "Please login to continue",
          type: "warning",
        });
      } else if (code != null && postCommentError != null) {
        setShowAlert({
          show: true,
          title: "Error",
          msg: postCommentError.ErrorMessage || "Some Error Occurred",
          type: "error",
        });
      }
    };

    handleErrorCode(postCommentErrorCode);
  }, [postCommentError, postCommentErrorCode]);
  const onClickPost = () => {
    const data = {
      title: "string",
      description: commentTxt.trim(),
      userId: userDetail?.userId,
      adContentId: postDetail?.id,
    };
    dispatch(postCommentApi(data)).then((res) => {
      setCommentTxt("");
      dispatch(getCommentByContentIdApi(postDetail?.id, 1, 10));
    });
  };
  const renderItem = ({ item, index }) => {
    return <CommentItem item={item} />;
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
        {isLoading ? (
          <Loading />
        ) : !isLoading && error != null ? (
          <ServerError msg={error?.ErrorMessage} statusCode={errorCode} />
        ) : commentData?.length <= 0 ? (
          <FriendlyMsg />
        ) : (
          <>
            <FlatList
              data={commentData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
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
