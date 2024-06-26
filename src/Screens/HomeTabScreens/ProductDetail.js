import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { useEffect } from "react";
import { setError } from "../../store/AdContentSlices/GetAdContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import Loading from "../../Components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAdContentByIdApi,
  resetAdContentDataById,
} from "../../store/AdContentSlices/GetAdContentById";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import useErrorHook from "../../CustomeHooks/useErrorHook";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { contentId } = route?.params;
  const { data } = route?.params;
  const [loading, setLoading] = useState(true);
  const {
    error: likeError,
    statusCode: likeErrorCode,
    likeData: likeDataRes,
  } = useSelector((state) => state.like);
  const {
    error: saveError,
    statusCode: saveErrorCode,
    saveData: saveDataRes,
  } = useSelector((state) => state.saveContent);
  const { contentData, isLoading, error } = useSelector(
    (state) => state.getAdContentById
  );
  const {
    isSuccess: getCommentSuccesss,
    totalCount: totalComment,
    contentId: commentId,
  } = useSelector((state) => state.getCommentByContentId);
  const [adContent, setAdContent] = useState(null);
  const { apiShowError, setApiShowError } = useErrorHook(
    likeError || saveError,
    likeErrorCode || saveErrorCode
  );
  useEffect(() => {
    // setLoading(true);
    if (data) {
      setAdContent(data);
      setLoading(false);
    }
    return () => {
      dispatch(resetAdContentDataById());
    };
  }, [data]);
  useEffect(() => {
    if (contentId) dispatch(getAdContentByIdApi(contentId));
    return () => {
      dispatch(resetAdContentDataById());
    };
  }, [contentId]);

  useEffect(() => {
    if (contentData !== null && contentData?.Success)
      setAdContent(contentData?.Data);
    setLoading(false);
  }, [contentData]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes.Success) {
      updateData(likeDataRes?.Data, "like");
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      updateData(saveDataRes?.Data, "save");
    }
  }, [saveDataRes]);
  useEffect(() => {
    if (getCommentSuccesss) {
      updateData(commentId, "comment");
    }
  }, [getCommentSuccesss]);

  const onClickModalBtn = () => {
    dispatch(setError(null));
    setApiShowError({ ...apiShowError, show: false });
  };
  const updateData = (data, actionType) => {
    if (actionType === "like" && adContent?.id === data?.contentId) {
      setAdContent({
        ...adContent,
        isCurrentUserLiked: data?.isLiked,
        totalLikes: data?.totalLikes,
      });
    }
    if (actionType === "save" && adContent?.id === data?.adContentID) {
      setAdContent({
        ...adContent,
        isCurrentUserSaved: data?.isSaved,
      });
    }
    if (actionType === "comment" && adContent?.id === data) {
      setAdContent({
        ...adContent,
        totalComments: totalComment,
      });
    }
  };
  if (loading || isLoading) {
    return <Loading />;
  }
  if (error !== null && !error?.Success) {
    return <ErrorMsg />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Product Detail"} />
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {adContent && adContent !== null && !adContent?.isDeleted ? (
          <FeedCard
            itemData={adContent}
            disable={true}
            currentPost={adContent?.id}
          />
        ) : !isLoading||!loading&& adContent === null || adContent?.isDeleted ? (
          <FriendlyMsg msgWithImage={"Content not availaibale"} />
        ) : null}
        {/* unComment After 1st version */}
        {/* <AdView /> */}
      </ScrollView>
      <CustomeAlertModal
        isVisible={apiShowError.show}
        title={apiShowError.title}
        msg={apiShowError.msg}
        type={apiShowError.type}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
