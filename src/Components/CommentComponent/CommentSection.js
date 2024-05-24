import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Avatar, Divider } from "react-native-paper";
import CommentItem from "./CommentItem";
import Loading from "../Loading";
import ServerError from "../ErrorScreens/ServerError";
import { useDispatch, useSelector } from "react-redux";
import {
  postCommentApi,
  resetPostCommentData,
} from "../../store/commentSlices/PostCommentSlice";
import {
  getCommentByContentIdApi,
  resetCommentPage,
  setCommentPage,
} from "../../store/commentSlices/GetCommentByContentIdSlice";
import colors from "../../Constants/colors";
import CommentTextInput from "./CommentTextInput";

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
  const { postComment: postCommentRes, isLoading: postCommentLoading } =
    useSelector((state) => state.postComment);
  const [commentTxt, setCommentTxt] = useState("");
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    getCommentData();
  }, [commentPage,postCommentRes?.Success]);
  
  useEffect(() => {
    if (commentDataRes && getCommentSuccesss) {
      setCommentData(commentDataRes);
    }
  }, [commentDataRes, getCommentSuccesss]);
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
      dispatch(resetPostCommentData());
    });
    // dispatch(postCommentApi(data))
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
    // <ScrollView
    //     style={{flex:1}}
    //     showsVerticalScrollIndicator={false}
    //     keyboardShouldPersistTaps='handled'
    //   >
    <View style={styles.modalView}>
      <Text style={styles.headingTxt}>Comments</Text>
      <Divider
        style={{
          marginTop: verticalScale(10),
        }}
      />
      {!commentLoading && commentError === null && commentData?.length <= 0 ? (
        <View style={[styles.msgView]}>
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

      <CommentTextInput
        setvalue={setCommentTxt}
        value={commentTxt}
        showBtn={commentTxt != ""}
        disable={postCommentLoading}
        loading={postCommentLoading}
        onClickPost={() => {
          onClickPost();
        }}
      />
    </View>
    //  </ScrollView>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  msgTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(14),
  },
});
